import Link from "next/link";
import Reveal from "./Reveal";
import { meetAnanya } from "@/config/content.config";

/** Warm, personality-led intro — the "I'm Ananya" moment of the homepage. */
export default function MeetAnanya() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="spotlight-top absolute inset-x-0 top-0 h-64" aria-hidden />
      <div className="container-site relative grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <figure className="img-grade card-premium !translate-y-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={meetAnanya.image}
              alt={meetAnanya.imageAlt}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </figure>
          <span
            className="absolute -bottom-4 -right-2 rounded-full border border-gold/40 bg-ink/85 px-4 py-2 font-display text-sm italic text-gold backdrop-blur-md sm:-right-4"
            aria-hidden
          >
            Turning Every Stage Into an Experience
          </span>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">Meet Your Host</p>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold leading-tight text-ivory sm:text-5xl">
              Hi, I&rsquo;m <span className="gold-text">Ananya</span> — and I
              live for that moment the crowd lights up.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-xl leading-relaxed text-ivory-dim">
              I&rsquo;m an anchor, emcee and stage host who brings energy,
              elegance and effortless flow to every event. From a bride&rsquo;s
              grand entry to a college crowd of thousands, from boardroom galas
              to brand launches on the street — I read the room, hold the
              moment and keep your event moving exactly as it should.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-ivory-dim">
              250+ events on stage. Hindi, English and Bengali. One promise:
              your guests won&rsquo;t look at their phones.
            </p>
          </Reveal>
          <Reveal delay={0.22} className="mt-8 flex flex-wrap gap-4">
            <Link href="/about/" className="btn-gold">
              More About Ananya
            </Link>
            <Link href="/gallery/" className="btn-ghost">
              See Her On Stage
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
