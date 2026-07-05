/**
 * CONTENT CURATION CONFIG — the simple, safe "admin".
 * Edit this file to curate what appears on the site, then commit.
 * (Live DB curation: see /admin once SUPABASE + ADMIN_TOKEN are configured.)
 */

/** Hero media. Swap paths to change the hero instantly. */
export const heroMedia = {
  /**
   * Fast-cut cinematic montage (10 real events: sangeet, haldi stage, college,
   * corporate, brand launch, cultural, private). ~11.5s muted loop.
   * tall = mobile/vertical, wide = desktop/landscape.
   */
  montage: {
    tall: "/media/hero/hero-montage-tall.mp4",
    tallPoster: "/media/hero/hero-montage-tall-poster.jpg",
    wide: "/media/hero/hero-montage-wide.mp4",
    widePoster: "/media/hero/hero-montage-wide-poster.jpg",
    alt: "Montage of Anchor Ananya Kundu hosting weddings, college fests, corporate events, brand launches and cultural shows",
  },
  /** Longer showreel with sound — plays in the Watch Showreel modal. */
  showreel: {
    src: "/media/reels/showreel.mp4",
    poster: "/media/reels/showreel-poster.jpg",
    title: "Anchor Ananya — Official Showreel",
  },
  /** Legacy portrait loop (kept for reuse elsewhere). */
  video: "/media/hero/hero-cinematic.mp4",
  videoPoster: "/media/hero/hero-cinematic-poster.jpg",
  portrait: "/media/hero/hero-stage.jpg",
  portraitAlt:
    "Anchor Ananya Kundu on stage with microphone, arm raised, mid-performance",
  accent: "/media/hero/hero-lights.jpg",
};

/** "Meet Ananya" homepage intro. */
export const meetAnanya = {
  image: "/media/about/about-mic.jpg",
  imageAlt: "Anchor Ananya Kundu smiling with a microphone, warm close-up",
};

/** "Where You've Seen Her Host" — event-type credibility tiles. */
export const whereSeen = [
  { label: "Weddings", src: "/media/weddings/wedding-arch-1.jpg" },
  { label: "College Fests", src: "/media/college/college-annualday-1.jpg" },
  { label: "Corporate Galas", src: "/media/corporate/corporate-lawn-1.jpg" },
  { label: "Brand Launches", src: "/media/brand/brand-vivo-launch.jpg" },
  { label: "Award Nights", src: "/media/corporate/corporate-award.jpg" },
  { label: "Cultural Shows", src: "/media/cultural/cultural-saree.jpg" },
  { label: "Baby Showers", src: "/media/private/babyshower-host.jpg" },
] as const;

/** Featured video moments — each opens in the video lightbox. */
export const videoMoments = [
  { src: "/media/videos/wedding-reel.mp4", poster: "/media/videos/wedding-reel-poster.jpg", label: "Wedding Energy", waKey: "wedding" },
  { src: "/media/videos/college-reel.mp4", poster: "/media/videos/college-reel-poster.jpg", label: "College Fest Crowd", waKey: "college" },
  { src: "/media/videos/corporate-reel.mp4", poster: "/media/videos/corporate-reel-poster.jpg", label: "Corporate Hosting", waKey: "corporate" },
  { src: "/media/videos/brand-reel.mp4", poster: "/media/videos/brand-reel-poster.jpg", label: "Brand Launch Stage", waKey: "brand" },
  { src: "/media/videos/cultural-reel.mp4", poster: "/media/videos/cultural-reel-poster.jpg", label: "Cultural Night", waKey: "cultural" },
  { src: "/media/videos/haldi-reel.mp4", poster: "/media/videos/haldi-reel-poster.jpg", label: "Haldi Celebrations", waKey: "haldi" },
] as const;

/** Homepage services showcase — six visual cards with benefit lines. */
export const homeServices = [
  {
    title: "Wedding & Sangeet Hosting",
    benefit: "Every ritual, entry and family game narrated so your day flows — and your guests stay in the moment.",
    src: "/media/weddings/sangeet-lights.jpg",
    waKey: "wedding",
  },
  {
    title: "College Fests & Annual Days",
    benefit: "Pace, wit and crowd-work that keeps students, parents and faculty energised from first act to final award.",
    src: "/media/college/college-annualday-1.jpg",
    waKey: "college",
  },
  {
    title: "Corporate Events & Award Nights",
    benefit: "Polished, on-brand hosting for galas, family days and felicitations — sharp scripts, zero dead air.",
    src: "/media/corporate/corporate-lawn-1.jpg",
    waKey: "corporate",
  },
  {
    title: "Brand Launches & Promotions",
    benefit: "Launch-day energy that pulls a crowd, holds attention and puts your product centre-stage.",
    src: "/media/brand/brand-vivo-launch.jpg",
    waKey: "brand",
  },
  {
    title: "Cultural Shows & Live Events",
    benefit: "Bilingual warmth and stage command for festivals, community nights and live performances.",
    src: "/media/cultural/cultural-saree.jpg",
    waKey: "cultural",
  },
  {
    title: "Private Celebrations",
    benefit: "Birthdays, baby showers and milestones hosted with games, laughter and moments your family will replay.",
    src: "/media/private/private-birthday-2.jpg",
    waKey: "private",
  },
] as const;

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
