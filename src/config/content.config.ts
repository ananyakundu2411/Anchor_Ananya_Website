/**
 * CONTENT CURATION CONFIG — the simple, safe "admin".
 * Edit this file to curate what appears on the site, then commit.
 * (A protected /admin route is on the backlog — see docs/TASKS.md.)
 */

/** Hero media (portrait card). Swap paths to change the hero instantly. */
export const heroMedia = {
  /** Cinematic portrait loop (graded cuts from her pro stage footage). */
  video: "/media/hero/hero-cinematic.mp4",
  videoPoster: "/media/hero/hero-cinematic-poster.jpg",
  portrait: "/media/hero/hero-stage.jpg",
  portraitAlt:
    "Anchor Ananya Kundu on stage with microphone, arm raised, mid-performance",
  accent: "/media/hero/hero-lights.jpg",
};

/** Homepage Featured Events — exactly one strong item per category. */
export const featuredEvents = [
  { src: "/media/weddings/wedding-arch-1.jpg", category: "weddings", label: "Weddings", caption: "Wedding Ceremony Hosting", waKey: "wedding" },
  { src: "/media/weddings/sangeet-lights.jpg", category: "weddings", label: "Sangeet Nights", caption: "Sangeet Under the Lights", waKey: "sangeet" },
  { src: "/media/weddings/haldi-yellow.jpg", category: "weddings", label: "Haldi", caption: "Haldi Morning Rituals", waKey: "haldi" },
  { src: "/media/corporate/corporate-lawn-1.jpg", category: "corporate", label: "Corporate", caption: "Corporate Gala Evening", waKey: "corporate" },
  { src: "/media/brand/brand-vivo-launch.jpg", category: "brand", label: "Brand Launches", caption: "vivo X200 FE Brand Launch", waKey: "brand" },
  { src: "/media/private/private-birthday-2.jpg", category: "private", label: "Private Celebrations", caption: "Milestone Birthday Hosting", waKey: "private" },
  { src: "/media/cultural/cultural-saree.jpg", category: "cultural", label: "Cultural Shows", caption: "Cultural Festival Stage", waKey: "cultural" },
  { src: "/media/weddings/engagement-1.jpg", category: "weddings", label: "Engagements", caption: "Ring Ceremony Evening", waKey: "engagement" },
  { src: "/media/private/newyear-2.jpg", category: "private", label: "New Year Galas", caption: "New Year Countdown Night", waKey: "newyear" },
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
