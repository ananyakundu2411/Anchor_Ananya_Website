"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { site, waLink } from "@/config/site";

function GoogleBadge() {
  return (
    <a
      href={site.social.googleBusiness}
      target="_blank"
      rel="noopener noreferrer"
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

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Cinematic Ken Burns background — two premium stage shots crossfading */}
      <div className="absolute inset-0" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/media/hero/hero-stage.jpg"
          alt=""
          fetchPriority="high"
          className={`h-full w-full object-cover object-[68%_12%] ${reduce ? "" : "hero-kenburns"}`}
        />
        {!reduce && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/media/hero/hero-lights.jpg"
            alt=""
            loading="lazy"
            className="hero-kenburns-alt absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 from-5% via-ink/60 via-40% to-ink/10 to-75%" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink from-2% via-transparent via-35% to-ink/45" />
        <div className="hero-vignette absolute inset-0" />
        <div className="spotlight-top absolute inset-x-0 top-0 h-72" />
      </div>

      <div className="container-site relative pb-24 pt-32 sm:pt-36">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="eyebrow"
        >
          Professional Anchor · Emcee · Event Host
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mt-5 max-w-3xl text-balance font-display text-5xl font-semibold leading-[1.05] text-ivory sm:text-6xl lg:text-7xl"
        >
          Turning Every Stage Into an{" "}
          <em className="gold-text-animated not-italic">Experience</em>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-ivory-dim"
        >
          Ananya Kundu brings elegance, energy and effortless flow to weddings,
          corporate events, brand launches, college festivals, cultural shows
          and private celebrations across India.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden>
              <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.94L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Z" />
            </svg>
            Book Ananya on WhatsApp
          </a>
          <Link href="/contact/" className="btn-ghost">
            Send Enquiry
          </Link>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.95 }}
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
        >
          <GoogleBadge />
          <span className="flex items-center gap-3 text-xs uppercase tracking-widest2 text-ivory-dim/70">
            <span className="h-px w-8 bg-gold/60" aria-hidden />
            {site.stats[0].value}+ events hosted across India
          </span>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block" aria-hidden>
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-ivory/30 p-1.5">
          <motion.span
            animate={reduce ? undefined : { y: [0, 14, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-gold"
          />
        </div>
      </div>
    </section>
  );
}
