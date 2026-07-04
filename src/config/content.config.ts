/**
 * CONTENT CURATION CONFIG — the simple, safe "admin".
 * Edit this file to curate what appears on the site, then commit.
 * (A protected /admin route is on the backlog — see docs/TASKS.md.)
 */

/** Hero media (portrait card). Swap paths to change the hero instantly. */
export const heroMedia = {
  portrait: "/media/hero/hero-stage.jpg",
  portraitAlt:
    "Anchor Ananya Kundu on stage with microphone, arm raised, mid-performance",
  accent: "/media/hero/hero-lights.jpg",
};

/** Homepage Featured Events — exactly one strong item per category. */
export const featuredEvents = [
  { src: "/media/weddings/wedding-arch-1.jpg", category: "weddings", caption: "Wedding Ceremony Hosting", waKey: "wedding" },
  { src: "/media/college/college-annualday-1.jpg", category: "college", caption: "Annual Day Hosting", waKey: "college" },
  { src: "/media/corporate/corporate-lawn-1.jpg", category: "corporate", caption: "Corporate Gala Evening", waKey: "corporate" },
  { src: "/media/brand/brand-vivo-launch.jpg", category: "brand", caption: "vivo X200 FE Brand Launch", waKey: "brand" },
  { src: "/media/cultural/cultural-saree.jpg", category: "cultural", caption: "Cultural Festival Stage", waKey: "cultural" },
  { src: "/media/private/private-birthday-2.jpg", category: "private", caption: "Private Celebration", waKey: "private" },
] as const;

/** College & Campus Events homepage section. */
export const collegeSection = {
  images: [
    { src: "/media/college/college-annualday-1.jpg", caption: "Annual Day Hosting" },
    { src: "/media/college/college-annualday-2.jpg", caption: "Campus Crowd Engagement" },
    { src: "/media/college/college-annualday-3.jpg", caption: "Prize Distribution Ceremony" },
  ],
  reel: { src: "/media/videos/college-reel.mp4", poster: "/media/videos/college-reel-poster.jpg", label: "Annual Day Highlights" },
};

/** Reviews curation: pin best first, hide anything off-brand (by index/id). */
export const reviewCuration = {
  pinned: [0],
  hidden: [] as number[],
  /** When DB sync is live: auto-publish only >= this rating. */
  autoPublishMinRating: 4,
};

/** Instagram curation (applies to synced posts once creds are configured). */
export const instagramCuration = {
  hiddenIds: [] as string[],
  featuredIds: [] as string[],
};
