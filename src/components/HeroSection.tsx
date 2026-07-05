"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { site, waLink } from "@/config/site";
import { heroMedia } from "@/config/content.config";
import { track } from "@/lib/track";
import ShowreelModal from "./ShowreelModal";

/**
 * Cinematic video-led hero: a fast-cut montage of Ananya's real hosting
 * moments (weddings, college fests, corporate, brand launches, cultural)
 * plays full-bleed behind the copy. Vertical-first on mobile — like a
 * premium event showreel — landscape edit on desktop.
 *
 * SSR renders the poster + real trust numbers; the video layer mounts on
 * the client and fades in, so LCP, no-JS and reduced-motion all stay clean.
 */
export default function HeroSection() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<{ src: string; poster: string } | null>(null);
  const [playing, setPlaying] = useState(false);
  const [showreelOpen, setShowreelOpen] = useState(false);

  useEffect(() => {
    if (reduce) return; // poster only
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    setVideoSrc(
      wide
        ? { src: heroMedia.montage.wide, poster: heroMedia.montage.widePoster }
        : { src: heroMedia.montage.tall, poster: heroMedia.montage.tallPoster }
    );
  }, [reduce]);

  const openShowreel = () => {
    setShowreelOpen(true);
    videoRef.current?.pause();
    track("showreel_open", { source: "hero" });
  };
  const closeShowreel = () => {
    setShowreelOpen(false);
    videoRef.current?.play().catch(() => {});
  };

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.21, 0.6, 0.35, 1] as const },
  });

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden lg:items-center">
      {/* ——— Video/poster background ——— */}
      <div className="absolute inset-0" aria-hidden>
        <picture>
          <source media="(min-width: 1024px)" srcSet={heroMedia.montage.widePoster} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroMedia.montage.tallPoster}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>
        {videoSrc && (
          <video
            ref={videoRef}
            key={videoSrc.src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={videoSrc.poster}
            onPlaying={() => setPlaying(true)}
            aria-label={heroMedia.montage.alt}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
              playing ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={videoSrc.src} type="video/mp4" />
          </video>
        )}

        {/* Readability — warm/dark only where the copy sits, her stage stays clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/15 lg:bg-gradient-to-r lg:from-ink/95 lg:via-ink/55 lg:to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/80 to-transparent" />
        <div className="hero-vignette absolute inset-0" />
      </div>

      {/* ——— Copy ——— */}
      <div className="container-site relative w-full pb-28 pt-32 lg:max-w-none lg:pb-24">
        <div className="max-w-2xl">
          <motion.p {...fade(0.05)} className="eyebrow">
            Anchor Ananya Kundu · {site.location.split("/")[0].trim()}
          </motion.p>

          <motion.h1
            {...fade(0.18)}
            className="mt-4 text-balance font-display text-[2.1rem] font-semibold leading-[1.08] text-ivory drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:text-5xl lg:text-6xl"
          >
            Premium Anchor &amp; Emcee for{" "}
            <span className="gold-text-animated">
              Weddings, College Fests, Brand Launches
            </span>{" "}
            &amp; Corporate Events
          </motion.h1>

          <motion.p
            {...fade(0.32)}
            className="mt-4 max-w-xl text-balance leading-relaxed text-ivory/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)] sm:mt-5 sm:text-lg"
          >
            {site.subheadline}
          </motion.p>

          <motion.div {...fade(0.46)} className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
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
            <button onClick={openShowreel} className="btn-ghost bg-ink/40 backdrop-blur-sm">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-gold" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Showreel
            </button>
          </motion.div>

          {/* Proof strip — real numbers in the HTML (SEO/no-JS safe) */}
          <motion.div
            {...fade(0.6)}
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[11px] uppercase tracking-widest2 text-ivory/85 sm:text-xs"
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
              250+ Events Hosted
            </span>
            <a
              href={site.social.googleBusiness}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("review_click", { source: "hero_proof" })}
              className="flex items-center gap-2 transition-colors hover:text-gold"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/95 text-[9px] font-bold normal-case text-[#4285F4]">
                G
              </span>
              5.0 Google Rated
            </a>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
              Hosted Across India
            </span>
            <span className="hidden items-center gap-2 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
              {site.proofStrip}
            </span>
          </motion.div>
        </div>
      </div>

      <ShowreelModal
        open={showreelOpen}
        onClose={closeShowreel}
        src={heroMedia.showreel.src}
        poster={heroMedia.showreel.poster}
        title={heroMedia.showreel.title}
        waKey="showreel"
      />
    </section>
  );
}
