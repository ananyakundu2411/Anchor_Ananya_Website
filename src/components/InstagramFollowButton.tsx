"use client";

import { track } from "@/lib/track";

export default function InstagramFollowButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("instagram_click", { source: "instagram_section" })}
      className="btn-gold"
    >
      Follow Ananya on Instagram
    </a>
  );
}
