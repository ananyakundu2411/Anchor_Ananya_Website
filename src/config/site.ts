export const site = {
  name: "Anchor Ananya Kundu",
  shortName: "Ananya Kundu",
  tagline: "Turning Every Stage Into an Experience",
  headline:
    "Premium Anchor & Emcee for Weddings, College Fests, Brand Launches & Corporate Events",
  subheadline:
    "Elegant flow, high-energy crowd engagement, and seamless stage presence for unforgettable events across India.",
  description:
    "Professional anchor, emcee and event host for weddings, corporate events, brand launches, college festivals, cultural shows and private celebrations across India.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://anchor-ananya-website-8sbm.vercel.app",
  location: "Mumbai / Navi Mumbai, India",

  whatsapp: {
    number: "+91 97658 27880",
    link: "https://wa.me/919765827880",
    message:
      "Hi Ananya, I'd like to check your availability for an event.\nEvent type: \nDate: \nCity: \nAudience size: \nI found you through your website.",
  },

  email: "ananyakundu2411@gmail.com",

  social: {
    instagram: "https://www.instagram.com/anchor.ananya/",
    instagramHandle: "@anchor.ananya",
    youtube: "https://www.youtube.com/@ananyakundu1501",
    facebook: "https://www.facebook.com/anchor.ananya2411/",
    googleBusiness: "https://maps.app.goo.gl/PY8q6ybFfXbiebXq7?g_st=ac",
  },

  // Editable stats — confirm real numbers with Ananya.
  stats: [
    { value: 250, suffix: "+", label: "Events Hosted" },
    { value: 5, suffix: ".0★", label: "Google Rating" },
    { value: 9, suffix: "+", label: "Event Categories" },
    { value: 3, suffix: "+", label: "Years on Stage" },
  ],

  proofStrip: "Weddings · College Fests · Corporate · Brand Launches",

  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about/" },
    { label: "Services", href: "/services/" },
    { label: "Gallery", href: "/gallery/" },
    { label: "Contact", href: "/contact/" },
  ],
};

/** Category-specific WhatsApp prefills (availability-check pattern). */
const AVAILABILITY = (eventType: string) =>
  `Hi Ananya, I'd like to check your availability for ${eventType}.\nDate: \nCity: \nAudience size: \nI found you through your website.`;

export const waMessages: Record<string, string> = {
  default: site.whatsapp.message,
  wedding: AVAILABILITY("a wedding / sangeet / engagement"),
  college: AVAILABILITY("a college event / annual day / fest"),
  corporate: AVAILABILITY("a corporate event"),
  brand: AVAILABILITY("a brand launch"),
  cultural: AVAILABILITY("a cultural show"),
  private: AVAILABILITY("a private celebration (birthday / baby shower)"),
  award: AVAILABILITY("an award night"),
  live: AVAILABILITY("a live show"),
  contact: site.whatsapp.message,
  gallery: AVAILABILITY("an event like this one"),
};

export function waLink(message?: string) {
  return `${site.whatsapp.link}?text=${encodeURIComponent(message || site.whatsapp.message)}`;
}

/** Category link helper — use with track("whatsapp_click", { source }) */
export function waCategoryLink(category: keyof typeof waMessages) {
  return waLink(waMessages[category] || waMessages.default);
}
