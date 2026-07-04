"use client";

import Reveal from "./Reveal";
import VideoCard from "./VideoCard";
import { waCategoryLink } from "@/config/site";
import { track } from "@/lib/track";

/**
 * High-value celebrations showcase: weddings, haldi, sangeet, receptions.
 * Editorial split — copy left, layered image collage right.
 */
const images = [
  { src: "/media/weddings/wedding-arch-1.jpg", caption: "Wedding Ceremony", tall: true },
  { src: "/media/weddings/haldi-floral.jpg", caption: "Haldi Morning", tall: false },
  { src: "/media/weddings/sangeet-gown.jpg", caption: "Reception Elegance", tall: false },
];

export default function CelebrationsSpotlight() {
  return (
    <section className="relative overflow-hidden border-t border-ink-line py-24">
      <div className="spotlight-top absolute inset-x-0 top-0 h-72" aria-hidden />
      <div className="container-site relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <p className="eyebrow">Weddings &amp; Celebrations</p>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold leading-tight text-ivory sm:text-5xl">
              The Moments Families <span className="gold-text">Never Forget</span>
            </h2>
            <p className="mt-4 max-w-md text-balance leading-relaxed text-ivory-dim">
              From the first haldi splash to the final reception dance — Ananya
              scripts, paces and narrates every ritual so the family lives the
              day instead of managing it.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-ivory-dim">
              {[
                "Wedding, sangeet, haldi, mehndi & reception hosting",
                "Couple entries, family games & emotional moments, perfectly timed",
                "Bilingual warmth that carries every generation of guests",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <a
              href={waCategoryLink("wedding")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { source: "celebrations_spotlight" })}
              className="btn-whatsapp mt-8"
            >
              Check Your Wedding Date
            </a>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <Reveal>
                <figure className="card-premium img-grade group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={images[0].src}
                    alt={`Anchor Ananya Kundu — ${images[0].caption}`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/4] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="card-scrim pointer-events-none absolute inset-x-0 bottom-0 h-2/5" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-3.5">
                    <p className="font-display text-base font-semibold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                      {images[0].caption}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
              <Reveal delay={0.1}>
                <figure className="card-premium img-grade group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={images[1].src}
                    alt={`Anchor Ananya Kundu — ${images[1].caption}`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="card-scrim pointer-events-none absolute inset-x-0 bottom-0 h-2/5" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-3.5">
                    <p className="font-display text-base font-semibold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                      {images[1].caption}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            </div>
            <div className="mt-10 space-y-4">
              <Reveal delay={0.15}>
                <VideoCard
                  src="/media/videos/wedding-reel.mp4"
                  poster="/media/videos/wedding-reel-poster.jpg"
                  label="Wedding Highlights"
                />
              </Reveal>
              <Reveal delay={0.25}>
                <figure className="card-premium img-grade group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={images[2].src}
                    alt={`Anchor Ananya Kundu — ${images[2].caption}`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="card-scrim pointer-events-none absolute inset-x-0 bottom-0 h-2/5" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-3.5">
                    <p className="font-display text-base font-semibold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                      {images[2].caption}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
