import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import MeetAnanya from "@/components/MeetAnanya";
import WhereSeen from "@/components/WhereSeen";
import VideoMoments from "@/components/VideoMoments";
import CollegeSection from "@/components/CollegeSection";
import CelebrationsSpotlight from "@/components/CelebrationsSpotlight";
import ServicesShowcase from "@/components/ServicesShowcase";
import BookingSteps from "@/components/BookingSteps";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import TestimonialsSection from "@/components/TestimonialsSection";
import InstagramSection from "@/components/InstagramSection";
import FinalCTA from "@/components/FinalCTA";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `${site.name} — Professional Anchor & Emcee | ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* 1 — Cinematic video hero */}
      <HeroSection />

      {/* Stats — real numbers render server-side, animate on view */}
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

      {/* 2 — Personal intro */}
      <MeetAnanya />

      {/* 3 — Event-type credibility */}
      <WhereSeen />

      {/* 4 — Featured video moments (lightbox) */}
      <VideoMoments />

      {/* 5 — College & campus events */}
      <CollegeSection />

      {/* Weddings & celebrations counterpart */}
      <CelebrationsSpotlight />

      {/* 6 — Services */}
      <ServicesShowcase />

      {/* 7 — Social proof */}
      <div id="reviews" className="scroll-mt-20">
        <TestimonialsSection full />
      </div>

      {/* 8 — Instagram (lazy, below the fold) */}
      <InstagramSection />

      {/* 9 — Booking process */}
      <BookingSteps />

      {/* 10 — Final CTA */}
      <FinalCTA />
    </>
  );
}
