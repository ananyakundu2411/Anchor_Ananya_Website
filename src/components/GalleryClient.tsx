"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { categories, galleryItems, type GalleryCategory, type GalleryItem } from "@/config/gallery";

function Lightbox({
  items,
  index,
  onClose,
  onNav,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  const item = items[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNav]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-ivory transition-colors hover:border-gold hover:text-gold"
      >
        ✕
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNav(-1); }}
        aria-label="Previous"
        className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-ivory transition-colors hover:border-gold hover:text-gold sm:left-6"
      >
        ‹
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNav(1); }}
        aria-label="Next"
        className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-ivory transition-colors hover:border-gold hover:text-gold sm:right-6"
      >
        ›
      </button>

      <div className="max-h-[85vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
        {item.type === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.src}
            alt={item.alt}
            className="max-h-[80vh] w-auto rounded-xl object-contain shadow-card"
          />
        ) : (
          <video
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            className="max-h-[80vh] w-auto rounded-xl shadow-card"
          />
        )}
        <p className="mt-4 text-center font-display text-lg text-ivory">
          {item.caption}
          <span className="ml-3 text-sm font-sans text-ivory-dim/70">
            {index + 1} / {items.length}
          </span>
        </p>
      </div>
    </motion.div>
  );
}

export default function GalleryClient({ preview = 0 }: { preview?: number }) {
  const [cat, setCat] = useState<GalleryCategory | "all">("all");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const items = useMemo(() => {
    const filtered = cat === "all" ? galleryItems : galleryItems.filter((i) => i.category === cat);
    return preview ? filtered.slice(0, preview) : filtered;
  }, [cat, preview]);

  const nav = useCallback(
    (dir: 1 | -1) =>
      setLightbox((v) => (v === null ? v : (v + dir + items.length) % items.length)),
    [items.length]
  );

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Gallery categories">
        {categories.map((c) => (
          <button
            key={c.key}
            role="tab"
            aria-selected={cat === c.key}
            onClick={() => setCat(c.key)}
            className={`rounded-full border px-5 py-2 text-sm tracking-wide transition-all duration-300 ${
              cat === c.key
                ? "border-gold bg-gold/15 text-gold shadow-glow"
                : "border-ink-line text-ivory-dim hover:border-gold/50 hover:text-ivory"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Masonry */}
      <motion.div layout={!reduce} className="masonry mt-12">
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.figure
              key={item.src}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="card-premium group cursor-pointer"
              onClick={() => setLightbox(i)}
            >
              {item.type === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className={`w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04] ${
                    item.orientation === "landscape" ? "aspect-[4/3]" : "aspect-[3/4]"
                  }`}
                />
              ) : (
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.poster!}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[9/16] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-ink/60 backdrop-blur-md">
                      <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-gold" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </div>
              )}
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/95 to-transparent p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="font-display text-lg text-ivory">{item.caption}</p>
                <p className="text-[11px] uppercase tracking-widest2 text-gold">
                  {item.category}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox items={items} index={lightbox} onClose={() => setLightbox(null)} onNav={nav} />
        )}
      </AnimatePresence>
    </div>
  );
}
