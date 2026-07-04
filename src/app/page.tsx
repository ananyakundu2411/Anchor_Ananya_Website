import Link from "next/link";
import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import EventMarquee from "@/components/EventMarquee";
import BookingSteps from "@/components/BookingSteps";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import TestimonialsSection from "@/components/TestimonialsSection";
import InstagramSection from "@/components/InstagramSection";
import FinalCTA from "@/components/FinalCTA";
import GalleryClient from "@/components/GalleryClient";
import { services } from "@/config/services";
import { site, waLink } from "@/config/site";

export const metadata: Metadata = {
  title: `${site.name} — Professional Anchor & Emcee | ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <EventMarquee />

      {/* Stats */}
      <section className="relative border-y border-ink-line bg-ink-soft/60 py-14">
        <div className="container-site grid grid-cols-2 gap-8 lg:grid-cols-4">
          {site.stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.1}
              className="relative text-center lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-ink-line"
            >
              <p className="font-display text-5xl font-semibold text-transparent gold-text sm:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest2 text-ivory-dim">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured services */}
      <section className="py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Signature Services"
            title={
              <>
                One Host. <span className="gold-text">Every Occasion.</span>
              </>
            }
            sub="From luxury weddings to boardroom galas — every event gets the same standard: elegant flow, engaged audiences, flawless timing."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.1}>
                <Link href="/services/" className="card-premium group block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.image}
                      alt={s.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl text-ivory transition-colors group-hover:text-gold">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ivory-dim">{s.copy}</p>
                    <span className="mt-4 inline-block text-xs uppercase tracking-widest2 text-gold">
                      Explore →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <Link href="/services/" className="btn-ghost">
              View All Services
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Portfolio preview */}
      <section className="relative border-t border-ink-line py-24">
        <div className="spotlight-top absolute inset-x-0 top-0 h-64" aria-hidden />
        <div className="container-site relative">
          <SectionHeading
            eyebrow="The Portfolio"
            title={
              <>
                Real Stages. <span className="gold-text">Real Moments.</span>
              </>
            }
            sub="A glimpse of the weddings, corporate galas, launches and celebrations Ananya has brought to life."
          />
          <div className="mt-14">
            <GalleryClient preview={9} />
          </div>
          <Reveal className="mt-12 text-center">
            <Link href="/gallery/" className="btn-gold">
              View Full Gallery
            </Link>
          </Reveal>
        </div>
      </section>

      <InstagramSection />

      <TestimonialsSection full />

      <BookingSteps />

      <FinalCTA />
    </>
  );
}
