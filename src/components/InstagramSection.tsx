import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import VideoCard from "./VideoCard";
import InstagramFollowButton from "./InstagramFollowButton";
import { instagramProfile, localReels } from "@/config/instagram";
import { instagramCuration } from "@/config/content.config";
import { site } from "@/config/site";
import { select } from "@/lib/db";

type SocialPost = {
  id: string;
  media_type: string;
  thumbnail_url: string | null;
  media_url: string | null;
  permalink: string;
  caption: string | null;
  category: string | null;
};

/**
 * Server component. When the DB is configured it shows ONLY posts that are
 * BOTH approved and featured (synced via /api/cron/sync-instagram, curated in
 * Supabase / content.config.ts). Without DB/credentials it falls back to
 * Ananya's locally hosted reels — the site never breaks or shows a gap.
 */
async function fetchFeaturedPosts(): Promise<SocialPost[]> {
  const rows = await select<SocialPost>(
    "social_posts?is_approved=eq.true&is_featured=eq.true&order=timestamp.desc&limit=4" +
      "&select=id,media_type,thumbnail_url,media_url,permalink,caption,category"
  );
  if (!rows) return [];
  return rows.filter((r) => !instagramCuration.hiddenIds.includes(r.id));
}

export default async function InstagramSection() {
  const posts = await fetchFeaturedPosts();
  const usingLive = posts.length > 0;

  return (
    <section className="relative py-24">
      <div className="spotlight-top absolute inset-x-0 top-0 h-64" aria-hidden />
      <div className="container-site relative">
        <SectionHeading
          eyebrow="On the Reel"
          title={
            <>
              Moments From <span className="gold-text">{site.social.instagramHandle}</span>
            </>
          }
          sub="Stage energy, client moments and behind-the-scenes — straight from Ananya's world."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {usingLive
            ? posts.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.08} className={i % 2 === 1 ? "sm:mt-10" : ""}>
                  <a
                    href={p.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-premium group block"
                    aria-label={`Open Instagram ${p.media_type === "VIDEO" ? "reel" : "post"}${p.category ? ` — ${p.category}` : ""}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.thumbnail_url || p.media_url || ""}
                      alt={(p.caption || "Instagram post by Anchor Ananya Kundu").slice(0, 120)}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[9/16] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4">
                      {p.category && (
                        <p className="text-[10px] uppercase tracking-widest2 text-gold">{p.category}</p>
                      )}
                      <p className="font-display text-lg text-ivory">
                        {p.media_type === "VIDEO" ? "Watch on Instagram" : "View on Instagram"} →
                      </p>
                    </div>
                  </a>
                </Reveal>
              ))
            : localReels.map((r, i) => (
                <Reveal key={r.src} delay={i * 0.08} className={i % 2 === 1 ? "sm:mt-10" : ""}>
                  <VideoCard src={r.src} poster={r.poster} label={r.label} />
                </Reveal>
              ))}
        </div>

        <Reveal className="mt-12 text-center">
          <InstagramFollowButton href={instagramProfile} />
        </Reveal>
      </div>
    </section>
  );
}
