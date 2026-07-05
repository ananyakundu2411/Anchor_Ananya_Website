"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import ShowreelModal from "./ShowreelModal";
import { videoMoments, heroMedia } from "@/config/content.config";
import type { waMessages } from "@/config/site";
import { track } from "@/lib/track";

type ActiveVideo = {
  src: string;
  poster?: string;
  label: string;
  waKey: keyof typeof waMessages;
};

/**
 * Featured showreel moments — six real event reels as premium video cards.
 * Each opens in the lightbox (no redirects), with a category WhatsApp CTA.
 */
export default function VideoMoments() {
  const [active, setActive] = useState<ActiveVideo | null>(null);

  const open = (m: ActiveVideo) => {
    setActive(m);
    track("video_moment_open", { label: m.label });
  };

  return (
    <section className="relative border-t border-ink-line py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Watch Her Work"
          title={
            <>
              Real Stages, <span className="gold-text">Real Energy</span>
            </>
          }
          sub="Tap any moment — wedding nights, college crowds, brand launches — and see exactly how Ananya holds a room."
        />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
          {videoMoments.map((m, i) => (
            <Reveal key={m.src} delay={(i % 6) * 0.06}>
              <button
                onClick={() => open(m as ActiveVideo)}
                className="card-premium img-grade group block w-full text-left"
                aria-label={`Play video: ${m.label}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.poster}
                  alt={`Video preview — ${m.label}`}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[9/16] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-ink/60 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                    <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-gold" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
                <span className="card-scrim pointer-events-none absolute inset-x-0 bottom-0 h-2/5" />
                <span className="absolute inset-x-0 bottom-0 p-3">
                  <span className="font-display text-base font-semibold leading-snug text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                    {m.label}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <button
            onClick={() =>
              open({
                src: heroMedia.showreel.src,
                poster: heroMedia.showreel.poster,
                label: "Full Showreel",
                waKey: "showreel",
              })
            }
            className="btn-ghost"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-gold" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch the Full Showreel
          </button>
        </Reveal>
      </div>

      <ShowreelModal
        open={active !== null}
        onClose={() => setActive(null)}
        src={active?.src ?? ""}
        poster={active?.poster}
        title={active?.label}
        waKey={active?.waKey ?? "showreel"}
      />
    </section>
  );
}
