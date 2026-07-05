"use client";

import { useCallback, useEffect, useRef } from "react";
import { waCategoryLink, waMessages } from "@/config/site";
import { track } from "@/lib/track";

type Props = {
  open: boolean;
  onClose: () => void;
  src: string;
  poster?: string;
  title?: string;
  /** WhatsApp prefill key for the CTA under the video. */
  waKey?: keyof typeof waMessages;
};

/**
 * Clean fullscreen video lightbox — plays the showreel (or any event reel)
 * without leaving the site. Sound on (user-initiated), Esc/backdrop closes.
 */
export default function ShowreelModal({ open, onClose, src, poster, title, waKey = "showreel" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    videoRef.current?.pause();
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={title || "Video player"}
    >
      <button
        className="absolute inset-0 cursor-default bg-ink/95 backdrop-blur-sm"
        onClick={close}
        aria-label="Close video"
        tabIndex={-1}
      />
      <div className="relative flex max-h-full w-full max-w-sm flex-col">
        <div className="mb-3 flex items-center justify-between gap-4">
          {title && <p className="font-display text-lg text-ivory">{title}</p>}
          <button
            ref={closeRef}
            onClick={close}
            aria-label="Close video"
            className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-ink/70 text-ivory transition-colors hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          preload="auto"
          className="max-h-[70svh] w-full rounded-2xl border border-gold/25 bg-black object-contain shadow-glow"
        />

        <a
          href={waCategoryLink(waKey)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { source: "showreel_modal" })}
          className="btn-whatsapp mt-4 w-full"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden>
            <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.94L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Z" />
          </svg>
          Check Availability on WhatsApp
        </a>
      </div>
    </div>
  );
}
