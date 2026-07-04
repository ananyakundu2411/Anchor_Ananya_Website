"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { site, waLink } from "@/config/site";
import { heroMedia } from "@/config/content.config";
import { track } from "@/lib/track";

function GoogleBadge() {
  return (
    <a
      href={site.social.googleBusiness}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("review_click", { source: "hero_badge" })}
      className="glass group inline-flex items-center gap-3 rounded-full py-2 pl-3 pr-5 transition-colors hover:border-gold/50"
      aria-label="Rated 5.0 on Google — read reviews"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 font-sans text-sm font-semibold text-[#4285F4]">
        G
      </span>
      <span className="flex flex-col leading-tight">
        <span className="flex items-center gap-1.5 text-sm font-medium text-ivory">
          5.0
          <span className="flex text-gold" aria-hidden>
            {"★★★★★"}
          </span>
        </span>
        <span className="text-[10px] uppercase tracking-widest2 text-ivory-dim/80 transition-colors group-hover:text-gold">
          Google Reviews
        </span>
      </span>
    </a>
  );
}

export default function HeroSection() {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.21, 0.6, 0.35, 1] as const },
  });

  return (
    <section className="relative overflow-hidden">
      {/* Ambient background — blurred accent image, NEVER over Ananya */}
      <div className="absolute inset-0" aria-hidden>
        <div
          className="h-full w-full scale-110 bg-cover bg-center opacity-25 blur-2xl"
          style={{ backgroundImage: `url(${heroMedia.accent})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/90 to-ink" />
        <div className="spotlight-top absolute inset-x-0 top-0 h-96" />
      </div>

      <div className="container-site relative grid items-center gap-8 pb-24 pt-24 lg:min-h-[100svh] lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-20 lg:pt-32">
        {/* Portrait — first on mobile so Ananya leads the page, fully visible */}
        <motion.div {...fade(0.3)} className="relative order-2 mx-auto w-full max-w-xs sm:max-w-sm lg:order-2 lg:max-w-none">
          <div className="img-grade relative overflow-hidden rounded-3xl border border-gold/25 shadow-glow">
            {reduce ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={heroMedia.videoPoster}
                alt={heroMedia.portraitAlt}
                fetchPriority="high"
                className="aspect-[4/5] max-h-[52svh] w-full object-cover object-top lg:aspect-[3/4] lg:max-h-none"
              />
            ) : (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={heroMedia.videoPoster}
                aria-label={heroMedia.portraitAlt}
                className="aspect-[4/5] max-h-[52svh] w-full object-cover object-top lg:aspect-[3/4] lg:max-h-none"
              >
                <source src={heroMedia.video} type="video/mp4" />
              </video>
            )}
            {/* readability strip at the very bottom only — face stays clear */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <p className="font-display text-lg italic text-ivory/95">Live on stage — real event footage</p>
              <span className="rounded-full border border-gold/40 bg-ink/60 px-3 py-1 text-[10px] uppercase tracking-widest2 text-gold backdrop-blur-md">
                Anchor · Emcee
              </span>
            </div>
          </div>
          {/* Floating rating chip — outside the portrait, never covering her */}
          <div className="absolute -left-3 top-6 hidden lg:block">
            <GoogleBadge />
          </div>
        </motion.div>

        {/* Copy column */}
        <div className="order-1 lg:order-1">
          <motion.p {...fade(0.05)} className="eyebrow">
            Anchor Ananya Kundu · {site.location.split("/")[0].trim()}
          </motion.p>

          <motion.h1
            {...fade(0.2)}
            className="mt-4 text-balance font-display text-[2rem] font-semibold leading-[1.1] text-ivory sm:text-5xl lg:text-6xl"
          >
            Premium Anchor &amp; Emcee for{" "}
            <span className="gold-text-animated">Weddings, College Fests, Brand
            Launches</span>{" "}
            &amp; Corporate Events
          </motion.h1>

          <motion.p {...fade(0.35)} className="mt-5 max-w-xl text-balance text-lg leading-relaxed text-ivory-dim">
            {site.subheadline}
          </motion.p>

          <motion.div {...fade(0.5)} className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { source: "hero" })}
              className="btn-whatsapp"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden>
                <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.94L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Z" />
              </svg>
              Check Availability on WhatsApp
            </a>
            <Link href="/gallery/" className="btn-ghost">
              View Real Events
            </Link>
          </motion.div>

          {/* Compact proof — one line, no clutter */}
          <motion.div {...fade(0.65)} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs uppercase tracking-widest2 text-ivory-dim/80">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
              {site.stats[0].value}+ Events Hosted
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
              5-Star Rated
            </span>
            <span className="hidden items-center gap-2 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
              {site.proofStrip}
            </span>
          </motion.div>

          <motion.div {...fade(0.75)} className="mt-6 lg:hidden">
            <GoogleBadge />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
