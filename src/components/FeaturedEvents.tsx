"use client";

import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Link from "next/link";
import { featuredEvents } from "@/config/content.config";
import { waCategoryLink, waMessages } from "@/config/site";
import { track } from "@/lib/track";

export default function FeaturedEvents() {
  return (
    <section className="relative border-t border-ink-line py-24">
      <div className="spotlight-top absolute inset-x-0 top-0 h-64" aria-hidden />
      <div className="container-site relative">
        <SectionHeading
          eyebrow="Signature Events"
          title={
            <>
              Every Celebration, <span className="gold-text">One Standard</span>
            </>
          }
          sub="Nine real stages — weddings, corporate galas, launches and celebrations, each hosted with the same premium standard."
        />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {featuredEvents.map((f, i) => (
            <Reveal key={f.src + i} delay={(i % 3) * 0.08}>
              <figure className="card-premium img-grade group relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.src}
                  alt={`Anchor Ananya Kundu — ${f.caption}`}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {/* Sunlight-proof scrim + always-visible titles (no hover needed on touch) */}
                <div className="card-scrim pointer-events-none absolute inset-x-0 bottom-0 z-10 h-3/5" />
                <figcaption className="absolute inset-x-0 bottom-0 z-20 p-3.5 sm:p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest2 text-gold-light">
                    {f.label}
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold leading-snug text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] sm:text-xl">
                    {f.caption}
                  </p>
                  <a
                    href={waCategoryLink(f.waKey as keyof typeof waMessages)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("gallery_cta", { source: "featured", category: f.label })}
                    className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#4ade80]"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
                      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.94L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Z" />
                    </svg>
                    Check date →
                  </a>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link href="/gallery/" className="btn-ghost">
            View the Full Gallery
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
