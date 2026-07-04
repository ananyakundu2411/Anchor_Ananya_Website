"use client";

import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import VideoCard from "./VideoCard";
import { testimonials, videoTestimonials } from "@/config/testimonials";
import { reviewCuration } from "@/config/content.config";
import { site } from "@/config/site";
import { track } from "@/lib/track";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-gold" aria-label={`${n} star rating`}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function TestimonialsSection({ full = false }: { full?: boolean }) {
  // Curation: pinned first, hidden removed (mirrors future DB auto-sync rules)
  const ordered = [
    ...reviewCuration.pinned.map((i) => testimonials[i]).filter(Boolean),
    ...testimonials.filter(
      (_, i) => !reviewCuration.pinned.includes(i) && !reviewCuration.hidden.includes(i)
    ),
  ].slice(0, 6);

  return (
    <section className="relative py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Verified Social Proof"
          title={
            <>
              Loved by Clients, <span className="gold-text">Rated 5 Stars</span>
            </>
          }
          sub="Real words and real videos from families, campuses and brands Ananya has hosted for."
        />

        {/* Rating summary card */}
        <Reveal className="mx-auto mt-12 max-w-md">
          <a
            href={site.social.googleBusiness}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("review_click", { source: "rating_card" })}
            className="card-premium !translate-y-0 flex items-center justify-between gap-4 p-6"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 font-sans text-xl font-semibold text-[#4285F4]">
                G
              </span>
              <div>
                <p className="font-display text-3xl font-semibold text-ivory">5.0</p>
                <Stars n={5} />
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest2 text-ivory-dim">Google Reviews</p>
              <p className="mt-1 text-sm font-medium text-gold">Read them all →</p>
            </div>
          </a>
        </Reveal>

        {/* Review cards — verified style */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((t, k) => (
            <Reveal key={t.name + k} delay={(k % 3) * 0.08}>
              <figure className="card-premium flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 font-sans text-sm font-semibold text-gold">
                      {initials(t.name)}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-ivory">{t.name}</p>
                      <Stars n={t.rating} />
                    </div>
                  </div>
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[11px] font-semibold text-[#4285F4]"
                    title="Sourced from Google reviews"
                    aria-label="Sourced from Google reviews"
                  >
                    G
                  </span>
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ivory-dim">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <figcaption className="mt-4 border-t border-ink-line pt-3">
                  <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[10px] uppercase tracking-widest2 text-gold">
                    {t.event}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Video testimonials */}
        {full && (
          <>
            <Reveal className="mt-16 text-center">
              <p className="eyebrow">Hear It From Them</p>
            </Reveal>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {videoTestimonials.map((v, k) => (
                <Reveal key={v.src} delay={k * 0.06}>
                  <VideoCard src={v.src} poster={v.poster} label={v.label} />
                </Reveal>
              ))}
            </div>
          </>
        )}

        <Reveal className="mt-12 text-center">
          <a
            href={site.social.googleBusiness}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("review_click", { source: "footer_button" })}
            className="btn-ghost"
          >
            View Google Reviews
          </a>
        </Reveal>
      </div>
    </section>
  );
}
