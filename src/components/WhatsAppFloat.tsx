"use client";

import { waLink } from "@/config/site";

export default function WhatsAppFloat() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Ananya on WhatsApp"
      className="fixed bottom-24 right-5 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#1FA855] shadow-[0_8px_30px_rgba(31,168,85,0.5)] transition-transform duration-300 hover:scale-110 lg:bottom-8 lg:flex"
    >
      <span className="absolute inset-0 animate-pulseSoft rounded-full bg-[#1FA855]/50 blur-md" aria-hidden />
      <svg viewBox="0 0 24 24" className="relative h-7 w-7 fill-white" aria-hidden>
        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.94L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm5.77 14.06c-.24.68-1.4 1.3-1.95 1.35-.5.05-1.13.24-3.8-.8-3.2-1.26-5.25-4.51-5.4-4.72-.16-.21-1.3-1.73-1.3-3.3 0-1.57.82-2.34 1.11-2.66.3-.32.64-.4.85-.4h.61c.2 0 .46-.07.72.55.27.64.9 2.2.98 2.36.08.16.13.35.03.56-.11.21-.16.34-.32.53-.16.19-.34.42-.48.56-.16.16-.33.34-.14.66.19.32.83 1.37 1.78 2.22 1.23 1.09 2.26 1.43 2.58 1.59.32.16.5.13.69-.08.19-.21.79-.92 1-1.24.21-.32.42-.26.72-.16.29.11 1.85.87 2.16 1.03.32.16.53.24.61.37.08.14.08.79-.16 1.48Z" />
      </svg>
    </a>
  );
}
