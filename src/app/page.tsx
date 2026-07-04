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
import FeaturedEvents from "@/components/FeaturedEvents";
import CollegeSection from "@/components/CollegeSection";
import { site } from "@/config/site";

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

      <FeaturedEvents />

      <CollegeSection />

      <InstagramSection />

      <TestimonialsSection full />

      <BookingSteps />

      <FinalCTA />
    </>
  );
}
