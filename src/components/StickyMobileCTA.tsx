"use client";

import Link from "next/link";
import { waLink } from "@/config/site";
import { track } from "@/lib/track";

export default function StickyMobileCTA() {
  return (
    <div className="glass fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-white/10 p-3 lg:hidden">
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_click", { source: "sticky_mobile" })}
        className="btn-whatsapp flex-1 !px-4 !py-3 text-[13px]"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" aria-hidden>
          <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.94L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Z" />
        </svg>
        Check Date on WhatsApp
      </a>
      <Link href="/contact/" className="btn-ghost flex-1 !px-4 !py-3 text-[13px]">
        Send Enquiry
      </Link>
    </div>
  );
}
