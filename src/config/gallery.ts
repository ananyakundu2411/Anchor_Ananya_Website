export type GalleryCategory =
  | "weddings"
  | "corporate"
  | "cultural"
  | "college"
  | "brand"
  | "private";

export type GalleryItem = {
  type: "image" | "video";
  src: string;
  poster?: string;
  category: GalleryCategory;
  caption: string;
  alt: string;
  location?: string;
  context?: string;
  /** portrait | landscape — helps masonry rhythm */
  orientation?: "portrait" | "landscape";
};

export const categories: { key: GalleryCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "weddings", label: "Weddings" },
  { key: "corporate", label: "Corporate" },
  { key: "cultural", label: "Cultural" },
  { key: "college", label: "College" },
  { key: "brand", label: "Brand Events" },
  { key: "private", label: "Private Events" },
];

const allItems: GalleryItem[] = [
  // ——— Weddings / Sangeet / Haldi / Mehndi / Engagement ———
  { type: "image", src: "/media/weddings/wedding-arch-1.jpg", category: "weddings", location: "Mumbai", context: "Ceremony flow, family entries and ritual narration", caption: "Wedding Ceremony", alt: "Anchor Ananya Kundu hosting a wedding beside a pastel floral arch", orientation: "portrait" },
  { type: "image", src: "/media/weddings/sangeet-lights.jpg", category: "weddings", location: "Mumbai", context: "Family performances, couple games and choreographed reveals", caption: "Sangeet Night", alt: "Anchor Ananya Kundu under a canopy of fairy lights at a sangeet", orientation: "portrait" },
  { type: "video", src: "/media/videos/wedding-reel.mp4", poster: "/media/videos/wedding-reel-poster.jpg", category: "weddings", caption: "Wedding Highlights", alt: "Wedding hosting highlight reel of Anchor Ananya Kundu", orientation: "portrait" },
  { type: "image", src: "/media/weddings/haldi-yellow.jpg", category: "weddings", caption: "Haldi Morning", alt: "Anchor Ananya Kundu in yellow hosting a haldi ceremony", orientation: "portrait" },
  { type: "image", src: "/media/weddings/wedding-floral.jpg", category: "weddings", caption: "Reception Evening", alt: "Anchor Ananya Kundu at a floral wedding reception stage", orientation: "portrait" },
  { type: "image", src: "/media/weddings/sangeet-glam.jpg", category: "weddings", caption: "Sangeet Celebrations", alt: "Anchor Ananya Kundu hosting a glamorous sangeet evening", orientation: "portrait" },
  { type: "image", src: "/media/weddings/engagement-1.jpg", category: "weddings", caption: "Engagement Ceremony", alt: "Anchor Ananya Kundu hosting an engagement ceremony on stage", orientation: "portrait" },
  { type: "video", src: "/media/videos/haldi-reel.mp4", poster: "/media/videos/haldi-reel-poster.jpg", category: "weddings", caption: "Haldi Moments", alt: "Haldi ceremony hosting reel of Anchor Ananya Kundu", orientation: "portrait" },
  { type: "image", src: "/media/weddings/haldi-arch.jpg", category: "weddings", caption: "Haldi Rituals", alt: "Anchor Ananya Kundu beside a marigold arch at a haldi", orientation: "portrait" },
  { type: "image", src: "/media/weddings/wedding-canopy.jpg", category: "weddings", caption: "Wedding Night", alt: "Anchor Ananya Kundu under a lit canopy at a wedding", orientation: "portrait" },
  { type: "image", src: "/media/weddings/sangeet-gown.jpg", category: "weddings", caption: "Reception Elegance", alt: "Anchor Ananya Kundu in an evening gown under a chandelier", orientation: "portrait" },
  { type: "image", src: "/media/weddings/mehndi-night.jpg", category: "weddings", caption: "Mehndi Evening", alt: "Anchor Ananya Kundu hosting a mehndi night", orientation: "portrait" },
  { type: "image", src: "/media/weddings/haldi-fun.jpg", category: "weddings", caption: "Haldi Games", alt: "Anchor Ananya Kundu leading games at a haldi celebration", orientation: "portrait" },
  { type: "image", src: "/media/weddings/wedding-red.jpg", category: "weddings", caption: "Shubh Vivah", alt: "Anchor Ananya Kundu hosting wedding rituals in the evening", orientation: "portrait" },
  { type: "image", src: "/media/weddings/engagement-2.jpg", category: "weddings", caption: "Ring Ceremony", alt: "Anchor Ananya Kundu announcing the ring ceremony", orientation: "portrait" },
  { type: "image", src: "/media/weddings/sangeet-stage.jpg", category: "weddings", caption: "Sangeet Stage", alt: "Anchor Ananya Kundu on a decorated sangeet stage", orientation: "portrait" },
  { type: "image", src: "/media/weddings/wedding-morning.jpg", category: "weddings", caption: "Morning Rituals", alt: "Anchor Ananya Kundu hosting morning wedding rituals", orientation: "portrait" },
  { type: "image", src: "/media/weddings/haldi-stage.jpg", category: "weddings", caption: "Haldi Décor", alt: "Anchor Ananya Kundu at a marigold-decorated haldi stage", orientation: "portrait" },
  { type: "image", src: "/media/weddings/wedding-evening.jpg", category: "weddings", caption: "Evening Ceremony", alt: "Anchor Ananya Kundu hosting an evening wedding ceremony", orientation: "portrait" },
  { type: "image", src: "/media/weddings/sangeet-night.jpg", category: "weddings", caption: "Dance Night", alt: "Anchor Ananya Kundu hosting a sangeet dance night", orientation: "portrait" },
  { type: "image", src: "/media/weddings/haldi-floral.jpg", category: "weddings", caption: "Haldi Celebrations", alt: "Anchor Ananya Kundu at a floral haldi celebration", orientation: "portrait" },

  // ——— Corporate ———
  { type: "image", src: "/media/corporate/corporate-lawn-1.jpg", category: "corporate", caption: "Corporate Gala Evening", alt: "Anchor Ananya Kundu in formal black hosting a corporate lawn event", orientation: "portrait" },
  { type: "video", src: "/media/videos/corporate-reel.mp4", poster: "/media/videos/corporate-reel-poster.jpg", category: "corporate", caption: "Corporate Highlights", alt: "Corporate event hosting reel of Anchor Ananya Kundu", orientation: "portrait" },
  { type: "image", src: "/media/corporate/corporate-flowerwall-1.jpg", category: "corporate", caption: "Annual Celebration", alt: "Anchor Ananya Kundu at a flower-wall corporate stage", orientation: "portrait" },
  { type: "image", src: "/media/corporate/corporate-lawn-2.jpg", category: "corporate", caption: "Audience Engagement", alt: "Anchor Ananya Kundu engaging a corporate audience", orientation: "landscape" },
  { type: "image", src: "/media/corporate/corporate-familyday.jpg", category: "corporate", caption: "Corporate Family Day", alt: "Anchor Ananya Kundu hosting a corporate family day", orientation: "portrait" },
  { type: "image", src: "/media/corporate/corporate-award.jpg", category: "corporate", caption: "Award Night", alt: "Anchor Ananya Kundu honoured at an award ceremony", orientation: "portrait" },
  { type: "image", src: "/media/corporate/corporate-lawn-3.jpg", category: "corporate", caption: "Evening Programme", alt: "Anchor Ananya Kundu presenting at an outdoor corporate evening", orientation: "landscape" },
  { type: "image", src: "/media/corporate/corporate-mic.jpg", category: "corporate", caption: "On the Mic", alt: "Anchor Ananya Kundu speaking at a corporate event", orientation: "landscape" },
  { type: "image", src: "/media/corporate/corporate-flowerwall-2.jpg", category: "corporate", caption: "Grand Opening", alt: "Anchor Ananya Kundu at a decorated corporate opening", orientation: "portrait" },

  // ——— Cultural ———
  { type: "image", src: "/media/cultural/cultural-saree.jpg", category: "cultural", caption: "Festival Stage Hosting", alt: "Anchor Ananya Kundu in a saree hosting a cultural festival", orientation: "portrait" },
  { type: "video", src: "/media/videos/cultural-reel.mp4", poster: "/media/videos/cultural-reel-poster.jpg", category: "cultural", caption: "Cultural Highlights", alt: "Cultural show hosting reel of Anchor Ananya Kundu", orientation: "portrait" },
  { type: "image", src: "/media/cultural/cultural-podium.jpg", category: "cultural", caption: "Community Festival", alt: "Anchor Ananya Kundu at a community festival podium", orientation: "portrait" },
  { type: "image", src: "/media/cultural/cultural-stage.jpg", category: "cultural", caption: "Cultural Evening", alt: "Anchor Ananya Kundu hosting a cultural evening on stage", orientation: "portrait" },
  { type: "image", src: "/media/cultural/cultural-republic.jpg", category: "cultural", caption: "National Celebration", alt: "Anchor Ananya Kundu hosting a national day celebration", orientation: "portrait" },
  { type: "image", src: "/media/cultural/cultural-fest.jpg", category: "cultural", caption: "Festival Night", alt: "Anchor Ananya Kundu hosting a festival night programme", orientation: "portrait" },

  // ——— College ———
  { type: "image", src: "/media/college/college-annualday-1.jpg", category: "college", location: "Navi Mumbai", context: "School annual day — full-day stage management", caption: "Annual Day Hosting", alt: "Anchor Ananya Kundu hosting an annual day on an outdoor stage", orientation: "portrait" },
  { type: "video", src: "/media/videos/college-reel.mp4", poster: "/media/videos/college-reel-poster.jpg", category: "college", caption: "Annual Day Highlights Reel", alt: "Annual day hosting reel of Anchor Ananya Kundu", orientation: "portrait" },
  { type: "image", src: "/media/college/college-annualday-2.jpg", category: "college", caption: "Campus Crowd Engagement", alt: "Anchor Ananya Kundu engaging students at an annual day", orientation: "portrait" },
  { type: "image", src: "/media/college/college-annualday-3.jpg", category: "college", caption: "Prize Distribution Ceremony", alt: "Anchor Ananya Kundu hosting a prize distribution ceremony", orientation: "portrait" },

  // ——— Brand ———
  { type: "image", src: "/media/brand/brand-vivo-launch.jpg", category: "brand", location: "Navi Mumbai", context: "Product reveal hosting for vivo retail launch", caption: "vivo X200 FE Brand Launch", alt: "Anchor Ananya Kundu hosting the vivo X200 FE launch", orientation: "portrait" },
  { type: "video", src: "/media/videos/brand-reel.mp4", poster: "/media/videos/brand-reel-poster.jpg", category: "brand", caption: "Brand Launch Highlights", alt: "Brand launch hosting reel of Anchor Ananya Kundu", orientation: "portrait" },

  // ——— Private ———
  { type: "image", src: "/media/private/private-birthday-2.jpg", category: "private", caption: "Milestone Birthday Hosting", alt: "Anchor Ananya Kundu hosting a birthday celebration", orientation: "portrait" },
  { type: "image", src: "/media/private/babyshower-pink.jpg", category: "private", location: "Airoli", context: "Traditional games with a premium hotel setting", caption: "Godh Bharai Ceremony", alt: "Anchor Ananya Kundu hosting an elegant baby shower", orientation: "portrait" },
  { type: "image", src: "/media/private/private-crowd-1.jpg", category: "private", caption: "Full-House Energy", alt: "Anchor Ananya Kundu raising energy at a private party", orientation: "landscape" },
  { type: "image", src: "/media/private/private-couple-stage.jpg", category: "private", caption: "Anniversary Evening", alt: "Anchor Ananya Kundu hosting an anniversary celebration", orientation: "portrait" },
  { type: "image", src: "/media/private/naming-ceremony.jpg", category: "private", caption: "Naming Ceremony", alt: "Anchor Ananya Kundu hosting a naming ceremony", orientation: "portrait" },
  { type: "image", src: "/media/private/private-kids.jpg", category: "private", caption: "Kids' Entertainment", alt: "Anchor Ananya Kundu entertaining children at an event", orientation: "landscape" },
  { type: "image", src: "/media/private/babyshower-blue.jpg", category: "private", caption: "Baby Shower Games", alt: "Anchor Ananya Kundu hosting baby shower games", orientation: "portrait" },
  { type: "image", src: "/media/private/private-family.jpg", category: "private", caption: "Family Celebration", alt: "Anchor Ananya Kundu with a family at a milestone celebration", orientation: "landscape" },
  { type: "image", src: "/media/private/newyear-1.jpg", category: "private", caption: "New Year Party", alt: "Anchor Ananya Kundu hosting a new year celebration", orientation: "portrait" },
  { type: "image", src: "/media/private/private-butterfly.jpg", category: "private", caption: "First Birthday", alt: "Anchor Ananya Kundu hosting a first birthday party", orientation: "portrait" },
  { type: "image", src: "/media/private/private-stage-decor.jpg", category: "private", caption: "Celebration Stage", alt: "Anchor Ananya Kundu on a decorated celebration stage", orientation: "landscape" },
  { type: "image", src: "/media/private/babyshower-host.jpg", category: "private", caption: "Godh Bharai", alt: "Anchor Ananya Kundu hosting a godh bharai ceremony", orientation: "portrait" },
  { type: "image", src: "/media/private/private-solo-mic.jpg", category: "private", caption: "Evening Host", alt: "Anchor Ananya Kundu with microphone at an evening event", orientation: "portrait" },
  { type: "image", src: "/media/private/newyear-2.jpg", category: "private", caption: "New Year Countdown", alt: "Anchor Ananya Kundu leading a new year countdown", orientation: "portrait" },
  { type: "image", src: "/media/private/private-party.jpg", category: "private", caption: "Party Nights", alt: "Anchor Ananya Kundu hosting a lively private party", orientation: "landscape" },
];

/**
 * Curated first screen — a balanced editorial mix (one strong item per
 * category) so "All" never opens wedding-only. Edit to re-curate.
 */
const firstSet = [
  "/media/weddings/wedding-arch-1.jpg",
  "/media/college/college-annualday-1.jpg",
  "/media/corporate/corporate-lawn-1.jpg",
  "/media/brand/brand-vivo-launch.jpg",
  "/media/cultural/cultural-saree.jpg",
  "/media/private/private-birthday-2.jpg",
  "/media/videos/wedding-reel.mp4",
  "/media/videos/college-reel.mp4",
  "/media/weddings/sangeet-lights.jpg",
];

export const galleryItems: GalleryItem[] = [
  ...firstSet.flatMap((s) => allItems.find((i) => i.src === s) ?? []),
  ...allItems.filter((i) => !firstSet.includes(i.src)),
];
