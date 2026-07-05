/**
 * Instagram — official-safe configuration. NO scraping.
 *
 * Option A (active): site-hosted reels (Ananya's own videos) shown as
 * premium vertical cards + links out to the Instagram profile.
 *
 * Option B: paste real post/reel URLs below; they render as elegant
 * link cards. For live thumbnails, use Meta's official oEmbed/Graph API
 * with INSTAGRAM_ACCESS_TOKEN (see INTEGRATIONS.md).
 */
export const instagramProfile = "https://www.instagram.com/anchor.ananya/";

/** Replace with real post/reel URLs, e.g. "https://www.instagram.com/reel/ABC123/" */
export const instagramPosts: string[] = [];

/** Ananya's own promo/hosting reels, served locally. */
export const localReels = [
  {
    src: "/media/reels/showreel.mp4",
    poster: "/media/reels/showreel-poster.jpg",
    label: "Official Showreel",
  },
  {
    src: "/media/reels/promo-1.mp4",
    poster: "/media/reels/promo-1-poster.jpg",
    label: "Anchor Life",
  },
  {
    src: "/media/videos/wedding-reel.mp4",
    poster: "/media/videos/wedding-reel-poster.jpg",
    label: "Wedding Hosting",
  },
  {
    src: "/media/videos/brand-reel.mp4",
    poster: "/media/videos/brand-reel-poster.jpg",
    label: "Brand Launch",
  },
];
