"use client";

import Link from "next/link";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { homeServices } from "@/config/content.config";
import { waCategoryLink, waMessages } from "@/config/site";
import { track } from "@/lib/track";

/** Six visual service cards — image, one benefit line, category WhatsApp CTA. */
export default function ServicesShowcase() {
  return (
    <section className="relative border-t border-ink-line py-24">
      <div className="spotlight-top absolute inset-x-0 top-0 h-64" aria-hidden />
      <div className="container-site relative">
        <SectionHeading
          eyebrow="What She Hosts"
          title={
            <>
              One Host, <span className="gold-text">Every Kind of Stage</span>
            </>
          }
          sub="Whatever you're planning, Ananya arrives with a script, a plan and the energy to carry it."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {homeServices.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <article className="card-premium img-grade group flex h-full flex-col">
                <div className="relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.src}
                    alt={`Anchor Ananya Kundu — ${s.title}`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="card-scrim pointer-events-none absolute inset-x-0 bottom-0 h-1/2" />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-display text-2xl font-semibold text-ivory">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ivory-dim">{s.benefit}</p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <a
                      href={waCategoryLink(s.waKey as keyof typeof waMessages)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track("whatsapp_click", { source: "services_card", category: s.title })}
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wide text-[#4ade80] transition-colors hover:text-[#86efac]"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.94L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Z" />
                      </svg>
                      Check date
                    </a>
                    <Link
                      href="/services/"
                      className="text-[12px] uppercase tracking-wide text-ivory-dim transition-colors hover:text-gold"
                    >
                      Details →
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link href="/services/" className="btn-ghost">
            Explore All Services
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
