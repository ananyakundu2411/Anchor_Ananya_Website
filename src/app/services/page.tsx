import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import FinalCTA from "@/components/FinalCTA";
import { services } from "@/config/services";
import { waLink } from "@/config/site";

export const metadata: Metadata = {
  title: "Services — Wedding, Corporate & Event Anchoring",
  description:
    "Wedding anchoring, corporate events, award nights, brand launches, college events, cultural shows, sangeet hosting, private celebrations and live shows — hosted by Anchor Ananya Kundu.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative pb-10 pt-40">
        <div className="spotlight-top absolute inset-x-0 top-0 h-96" aria-hidden />
        <div className="container-site relative">
          <SectionHeading
            eyebrow="Services"
            title={
              <>
                Every Stage, <span className="gold-text">Hosted to Perfection</span>
              </>
            }
            sub="Nine signature formats, one promise — your audience stays engaged, your schedule stays on time, and your event feels effortless."
          />
        </div>
      </section>

      <section className="py-14">
        <div className="container-site grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.1}>
              <article className="card-premium group flex h-full flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt={s.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-ink/60 px-3 py-1 text-[10px] uppercase tracking-widest2 text-gold backdrop-blur-md">
                    0{i + 1}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-2xl text-ivory transition-colors group-hover:text-gold">
                    {s.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ivory-dim">{s.copy}</p>
                  <a
                    href={waLink(`Hi Ananya, I would like to enquire about ${s.title.toLowerCase()} for my event.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest2 text-gold transition-all hover:gap-3"
                  >
                    Enquire Now <span aria-hidden>→</span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
