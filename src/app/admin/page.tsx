"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Owner curation panel — approve/hide/feature Instagram posts, approve/pin
 * Google reviews. Protected by ADMIN_TOKEN (entered here, kept in
 * sessionStorage only). Requires Supabase to be configured; until then it
 * explains the content.config.ts curation path. Not linked from the site.
 */

type Post = {
  id: string;
  media_type: string;
  thumbnail_url: string | null;
  media_url: string | null;
  permalink: string;
  caption: string | null;
  category: string | null;
  is_approved: boolean;
  is_featured: boolean;
  timestamp: string;
};

type Review = {
  review_id: string;
  reviewer_display_name: string;
  star_rating: number | null;
  comment: string;
  create_time: string;
  is_approved: boolean;
  is_featured: boolean;
};

const CATEGORIES = ["Wedding", "College Event", "Corporate", "Brand Launch", "Cultural", "Private Event"];

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [entered, setEntered] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tab, setTab] = useState<"posts" | "reviews">("posts");

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_token");
    if (saved) {
      setToken(saved);
      setEntered(true);
    }
  }, []);

  const api = useCallback(
    async (path: string, init?: RequestInit) => {
      const res = await fetch(path, {
        ...init,
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (res.status === 401) {
        setStatus("Wrong token. Check ADMIN_TOKEN and try again.");
        setEntered(false);
        sessionStorage.removeItem("admin_token");
        return null;
      }
      if (res.status === 503) {
        setStatus(
          "ADMIN_TOKEN is not set on the server. Set it in Vercel env vars to enable this panel."
        );
        return null;
      }
      return res.json();
    },
    [token]
  );

  const load = useCallback(async () => {
    setStatus("Loading…");
    const [p, r] = await Promise.all([api("/api/admin?kind=posts"), api("/api/admin?kind=reviews")]);
    if (!p || !r) return;
    if (p.reason === "db_not_configured") {
      setStatus(
        "Supabase is not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY). " +
          "Until then, curate via src/config/content.config.ts — the site works fully without the database."
      );
      return;
    }
    setPosts(p.rows ?? []);
    setReviews(r.rows ?? []);
    setStatus(null);
  }, [api]);

  useEffect(() => {
    if (entered && token) load();
  }, [entered, token, load]);

  const save = async (table: "social_posts" | "google_reviews", id: string, fields: object) => {
    const res = await api("/api/admin", {
      method: "POST",
      body: JSON.stringify({ table, id, fields }),
    });
    if (res && !res.ok) setStatus(`Save failed: ${res.reason}`);
  };

  const patchPost = (id: string, fields: Partial<Post>) => {
    setPosts((all) => all.map((p) => (p.id === id ? { ...p, ...fields } : p)));
    save("social_posts", id, fields);
  };
  const patchReview = (id: string, fields: Partial<Review>) => {
    setReviews((all) => all.map((r) => (r.review_id === id ? { ...r, ...fields } : r)));
    save("google_reviews", id, fields);
  };

  if (!entered) {
    return (
      <main className="container-site flex min-h-[70svh] flex-col items-center justify-center py-32">
        <h1 className="font-display text-3xl text-ivory">Admin — Content Curation</h1>
        <form
          className="mt-8 flex w-full max-w-sm gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!token) return;
            sessionStorage.setItem("admin_token", token);
            setEntered(true);
          }}
        >
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Admin token"
            className="input-premium"
            aria-label="Admin token"
          />
          <button type="submit" className="btn-gold !px-6">
            Enter
          </button>
        </form>
        {status && <p className="mt-6 max-w-md text-center text-sm text-ivory-dim">{status}</p>}
      </main>
    );
  }

  return (
    <main className="container-site py-28">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl text-ivory">Admin — Content Curation</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setTab("posts")}
            className={tab === "posts" ? "btn-gold !px-5 !py-2" : "btn-ghost !px-5 !py-2"}
          >
            Instagram ({posts.length})
          </button>
          <button
            onClick={() => setTab("reviews")}
            className={tab === "reviews" ? "btn-gold !px-5 !py-2" : "btn-ghost !px-5 !py-2"}
          >
            Reviews ({reviews.length})
          </button>
        </div>
      </div>

      {status && (
        <p className="mt-8 rounded-xl border border-gold/30 bg-gold/5 p-5 text-sm leading-relaxed text-ivory-dim">
          {status}
        </p>
      )}

      {tab === "posts" && (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <div key={p.id} className="card-premium !translate-y-0 p-4">
              <div className="flex gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.thumbnail_url || p.media_url || ""}
                  alt=""
                  className="h-24 w-20 rounded-lg object-cover"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs text-ivory-dim">{p.caption || "(no caption)"}</p>
                  <a
                    href={p.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-xs text-gold hover:underline"
                  >
                    Open on Instagram →
                  </a>
                  <select
                    value={p.category ?? ""}
                    onChange={(e) => patchPost(p.id, { category: e.target.value || null })}
                    className="input-premium mt-2 !py-1.5 text-xs"
                    aria-label="Category"
                  >
                    <option value="">No category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => patchPost(p.id, { is_approved: !p.is_approved })}
                  className={`flex-1 rounded-full border px-3 py-1.5 text-xs ${
                    p.is_approved
                      ? "border-[#1FA855] bg-[#1FA855]/15 text-[#4ade80]"
                      : "border-ink-line text-ivory-dim"
                  }`}
                >
                  {p.is_approved ? "Approved ✓" : "Hidden"}
                </button>
                <button
                  onClick={() => patchPost(p.id, { is_featured: !p.is_featured })}
                  className={`flex-1 rounded-full border px-3 py-1.5 text-xs ${
                    p.is_featured ? "border-gold bg-gold/15 text-gold" : "border-ink-line text-ivory-dim"
                  }`}
                >
                  {p.is_featured ? "Featured ★" : "Not featured"}
                </button>
              </div>
            </div>
          ))}
          {!posts.length && !status && (
            <p className="text-sm text-ivory-dim">No synced posts yet — the daily cron fills this list.</p>
          )}
        </div>
      )}

      {tab === "reviews" && (
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {reviews.map((r) => (
            <div key={r.review_id} className="card-premium !translate-y-0 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-ivory">{r.reviewer_display_name}</p>
                <span className="text-gold">{"★".repeat(r.star_rating ?? 0)}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ivory-dim">{r.comment}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => patchReview(r.review_id, { is_approved: !r.is_approved })}
                  className={`flex-1 rounded-full border px-3 py-1.5 text-xs ${
                    r.is_approved
                      ? "border-[#1FA855] bg-[#1FA855]/15 text-[#4ade80]"
                      : "border-ink-line text-ivory-dim"
                  }`}
                >
                  {r.is_approved ? "Visible ✓" : "Hidden"}
                </button>
                <button
                  onClick={() => patchReview(r.review_id, { is_featured: !r.is_featured })}
                  className={`flex-1 rounded-full border px-3 py-1.5 text-xs ${
                    r.is_featured ? "border-gold bg-gold/15 text-gold" : "border-ink-line text-ivory-dim"
                  }`}
                >
                  {r.is_featured ? "Pinned ★" : "Not pinned"}
                </button>
              </div>
            </div>
          ))}
          {!reviews.length && !status && (
            <p className="text-sm text-ivory-dim">
              No synced reviews yet — fallback testimonial cards are live on the site.
            </p>
          )}
        </div>
      )}

      <p className="mt-12 text-xs leading-relaxed text-ivory-dim/70">
        Hero video, homepage gallery and college-event images are curated in{" "}
        <code className="text-gold">src/config/content.config.ts</code> (commit to publish). This
        panel manages the database-synced Instagram posts and Google reviews only.
      </p>
    </main>
  );
}
