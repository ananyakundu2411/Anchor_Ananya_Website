import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import FinalCTA from "@/components/FinalCTA";
import { waLink } from "@/config/site";

export const metadata: Metadata = {
  title: "About — The Anchor Behind the Experience",
  description:
    "Meet Ananya Kundu — professional anchor and emcee known for stage confidence, audience engagement and flawless event flow at weddings, corporate events and celebrations across India.",
  alternates: { canonical: "/about/" },
};

const strengths = [
  {
    title: "Stage Confidence",
    copy: "From intimate baby showers to thousand-strong lawns, Ananya owns the stage — calm under pressure, quick on her feet, always in command of the moment.",
  },
  {
    title: "Audience Engagement",
    copy: "Games, banter, shayari or sharp corporate wit — she reads the room in seconds and keeps every generation of the audience leaning in.",
  },
  {
    title: "Flawless Event Flow",
    copy: "Rituals, protocols, performances and surprises land exactly on cue. Vendors, DJs and families all move to one seamless rhythm.",
  },
  {
    title: "Protocol & Poise",
    copy: "Chief guests welcomed with grace, sponsors credited with precision, and formalities delivered without ever losing the celebration's warmth.",
  },
];

const timeline = [
  { year: "The Spark", text: "A love for the microphone that started on school and college stages — and never left." },
  { year: "The Craft", text: "Hundreds of hours refining scripts, transitions, multilingual hosting and audience psychology across event formats." },
  { year: "The Circuit", text: "A trusted name for weddings, corporate galas, brand launches and cultural festivals across Mumbai, Navi Mumbai and beyond." },
  { year: "Today", text: "250+ events hosted, 5-star rated by clients, and a calendar that fills months in advance every season." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-24 pt-40">
        <div className="spotlight-top absolute inset-x-0 top-0 h-96" aria-hidden />
        <div className="container-site relative grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">About Ananya</p>
            <h1 className="mt-4 text-balance font-display text-5xl font-semibold leading-[1.05] text-ivory sm:text-6xl">
              The Voice Your Event <span className="gold-text">Remembers</span>
            </h1>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ivory-dim">
              <p>
                Ananya Kundu is a professional anchor and emcee who believes an
                event is never just a schedule — it&rsquo;s a story waiting to be told
                well. Warm with families, sharp with corporate audiences and
                electric with a crowd, she shifts effortlessly between grace and
                gusto.
              </p>
              <p>
                Whether she&rsquo;s guiding a bride&rsquo;s entry to goosebump-perfect
                timing, keeping an award night crisp and elegant, or turning a
                brand launch into a headline moment, Ananya carries the event
                so hosts can finally enjoy their own celebration.
              </p>
              <p>
                Based in Mumbai / Navi Mumbai and travelling across India, she
                hosts in English and Hindi, with a Bengali warmth that makes
                every audience feel at home.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                Book Ananya on WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative">
            <div className="card-premium !translate-y-0 rotate-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/about/about-mic.jpg"
                alt="Anchor Ananya Kundu smiling with a microphone while hosting an event"
                className="w-full object-cover"
              />
            </div>
            <div className="card-premium absolute -bottom-10 -left-6 hidden w-44 -rotate-3 animate-floaty sm:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/about/about-award.jpg"
                alt="Anchor Ananya Kundu receiving an award with certificate and sash"
                className="w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Strengths */}
      <section className="border-t border-ink-line py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Why Clients Trust Ananya"
            title={
              <>
                Proof, Not Promises — <span className="gold-text">A Safe Pair of Hands</span>
              </>
            }
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {strengths.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 0.1}>
                <div className="card-premium h-full p-8">
                  <span className="font-display text-5xl text-gold/25">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-2xl text-ivory">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory-dim">{s.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="relative overflow-hidden border-t border-ink-line py-20">
        <div className="spotlight-top absolute inset-x-0 top-0 h-full" aria-hidden />
        <Reveal className="container-site relative text-center">
          <span className="font-display text-7xl leading-none text-gold/20" aria-hidden>&ldquo;</span>
          <blockquote className="mx-auto -mt-6 max-w-2xl text-balance font-display text-3xl italic leading-snug text-ivory sm:text-4xl">
            An event is never just a schedule — it&rsquo;s a story waiting to be
            <span className="gold-text not-italic"> told well.</span>
          </blockquote>
          <p className="mt-6 text-xs uppercase tracking-widest2 text-ivory-dim/70">— Ananya Kundu</p>
        </Reveal>
      </section>

      {/* Journey */}
      <section className="relative border-t border-ink-line py-24">
        <div className="spotlight-top absolute inset-x-0 top-0 h-64" aria-hidden />
        <div className="container-site relative">
          <SectionHeading
            eyebrow="The Journey"
            title={
              <>
                From First Mic to <span className="gold-text">Full Calendars</span>
              </>
            }
          />
          <div className="relative mx-auto mt-16 max-w-2xl">
            <span className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-gold via-gold/40 to-transparent sm:left-1/2" aria-hidden />
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.08}>
                <div className={`relative mb-12 pl-12 sm:w-1/2 sm:pl-0 ${i % 2 ? "sm:ml-auto sm:pl-12" : "sm:pr-12 sm:text-right"}`}>
                  <span className={`absolute top-1 h-3 w-3 rounded-full bg-gold shadow-glow left-2.5 ${i % 2 ? "sm:left-[-7px]" : "sm:left-auto sm:right-[-5px]"}`} aria-hidden />
                  <h3 className="font-display text-2xl text-gold">{t.year}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ivory-dim">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Visual band */}
      <section className="border-t border-ink-line py-24">
        <div className="container-site grid gap-5 sm:grid-cols-3">
          {[
            { src: "/media/about/about-gown.jpg", alt: "Anchor Ananya Kundu in an elegant evening gown under a chandelier" },
            { src: "/media/hero/hero-stage.jpg", alt: "Anchor Ananya Kundu commanding the stage with her arm raised" },
            { src: "/media/about/about-crowd.jpg", alt: "Anchor Ananya Kundu engaging a lively audience" },
          ].map((img, i) => (
            <Reveal key={img.src} delay={i * 0.1} className={i === 1 ? "sm:-mt-8" : ""}>
              <div className="card-premium">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="aspect-[3/4] w-full object-cover object-top" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
