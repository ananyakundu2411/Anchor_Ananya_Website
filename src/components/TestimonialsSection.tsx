"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import VideoCard from "./VideoCard";
import { testimonials, videoTestimonials } from "@/config/testimonials";
import { site } from "@/config/site";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-1 text-gold" aria-label={`${n} star rating`}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection({ full = false }: { full?: boolean }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, [reduce]);

  const t = testimonials[i];

  return (
    <section className="relative py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Social Proof"
          title={
            <>
              Loved by Clients, <span className="gold-text">Rated 5 Stars</span>
            </>
          }
          sub="Real words and real videos from hosts, families and brands Ananya has worked with."
        />

        {/* Carousel */}
        <Reveal className="mx-auto mt-14 max-w-3xl">
          <div className="card-premium relative min-h-[260px] p-8 sm:p-12 !translate-y-0">
            <span className="absolute right-8 top-6 font-display text-8xl leading-none text-gold/15" aria-hidden>
              &ldquo;
            </span>
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <Stars n={t.rating} />
                  <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-widest2 text-ivory-dim/80">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/90 text-[9px] font-semibold text-[#4285F4]">G</span>
                    5-Star Client
                  </span>
                </div>
                <p className="mt-5 font-display text-xl leading-relaxed text-ivory sm:text-2xl">
                  {t.text}
                </p>
                <footer className="mt-6 text-sm text-ivory-dim">
                  <span className="font-medium text-gold">{t.name}</span> · {t.event}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2">
            {testimonials.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Show testimonial ${k + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  k === i ? "w-8 bg-gold" : "w-2 bg-ivory/25 hover:bg-ivory/50"
                }`}
              />
            ))}
          </div>
        </Reveal>

        {/* Video testimonials */}
        {full && (
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {videoTestimonials.map((v, k) => (
              <Reveal key={v.src} delay={k * 0.08}>
                <VideoCard src={v.src} poster={v.poster} label={v.label} />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal className="mt-12 text-center">
          <a
            href={site.social.googleBusiness}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            View Google Reviews
          </a>
        </Reveal>
      </div>
    </section>
  );
}
