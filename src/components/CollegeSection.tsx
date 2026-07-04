"use client";

import Reveal from "./Reveal";
import VideoCard from "./VideoCard";
import { collegeSection } from "@/config/content.config";
import { waCategoryLink } from "@/config/site";
import { track } from "@/lib/track";

export default function CollegeSection() {
  return (
    <section className="relative overflow-hidden border-t border-ink-line py-24">
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <p className="eyebrow">College &amp; Campus Events</p>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold leading-tight text-ivory sm:text-5xl">
              The Energy Your <span className="gold-text">Campus Remembers</span>
            </h2>
            <p className="mt-4 max-w-md text-balance leading-relaxed text-ivory-dim">
              Annual days, fests, farewells and prize distributions — hosted with
              the pace, wit and crowd-work that keeps students, parents and
              faculty locked in from first act to final award.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-ivory-dim">
              {["Annual day & prize distribution hosting", "Fest stages, competitions & celebrity segments", "Crowd games that get the whole campus involved"].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <a
              href={waCategoryLink("college")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { source: "college_section" })}
              className="btn-whatsapp mt-8"
            >
              Book for College Event
            </a>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              {collegeSection.images.slice(0, 2).map((img, i) => (
                <Reveal key={img.src} delay={i * 0.1}>
                  <figure className="card-premium group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={`Anchor Ananya Kundu — ${img.caption}`}
                      loading="lazy"
                      decoding="async"
                      className={`w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04] ${i === 0 ? "aspect-[3/4]" : "aspect-square"}`}
                    />
                    <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 to-transparent p-3">
                      <p className="font-display text-base text-ivory">{img.caption}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <div className="mt-8 space-y-4">
              <Reveal delay={0.15}>
                <VideoCard
                  src={collegeSection.reel.src}
                  poster={collegeSection.reel.poster}
                  label={collegeSection.reel.label}
                />
              </Reveal>
              <Reveal delay={0.25}>
                <figure className="card-premium group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={collegeSection.images[2].src}
                    alt={`Anchor Ananya Kundu — ${collegeSection.images[2].caption}`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 to-transparent p-3">
                    <p className="font-display text-base text-ivory">{collegeSection.images[2].caption}</p>
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
