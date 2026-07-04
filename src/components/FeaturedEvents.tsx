"use client";

import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Link from "next/link";
import { featuredEvents } from "@/config/content.config";
import { waCategoryLink, waMessages } from "@/config/site";
import { track } from "@/lib/track";

const CATEGORY_LABEL: Record<string, string> = {
  weddings: "Weddings",
  college: "College & Campus",
  corporate: "Corporate",
  brand: "Brand Launch",
  cultural: "Cultural",
  private: "Private Events",
};

export default function FeaturedEvents() {
  return (
    <section className="relative border-t border-ink-line py-24">
      <div className="spotlight-top absolute inset-x-0 top-0 h-64" aria-hidden />
      <div className="container-site relative">
        <SectionHeading
          eyebrow="Featured Events"
          title={
            <>
              One Stage at a Time, <span className="gold-text">Every World Covered</span>
            </>
          }
          sub="Six categories, six real events — a curated look at the range Ananya brings to a stage."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {featuredEvents.map((f, i) => (
            <Reveal key={f.src} delay={(i % 3) * 0.08}>
              <figure className="card-premium group relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.src}
                  alt={`Anchor Ananya Kundu — ${f.caption}`}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/95 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[10px] uppercase tracking-widest2 text-gold">
                    {CATEGORY_LABEL[f.category]}
                  </p>
                  <p className="mt-0.5 font-display text-lg leading-tight text-ivory sm:text-xl">
                    {f.caption}
                  </p>
                  <a
                    href={waCategoryLink(f.waKey as keyof typeof waMessages)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("gallery_cta", { source: "featured", category: f.category })}
                    className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest2 text-[#3fd577] opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus:opacity-100"
                  >
                    Check date on WhatsApp →
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
