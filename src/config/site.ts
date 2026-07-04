export const site = {
  name: "Anchor Ananya Kundu",
  shortName: "Ananya Kundu",
  tagline: "Turning Every Stage Into an Experience",
  description:
    "Professional anchor, emcee and event host for weddings, corporate events, brand launches, college festivals, cultural shows and private celebrations across India.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://anchorananya.com",
  location: "Mumbai / Navi Mumbai, India",

  whatsapp: {
    number: "+91 97658 27880",
    link: "https://wa.me/919765827880",
    message: "Hi Ananya, I would like to enquire about anchoring for an event.",
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
    { value: 100, suffix: "%", label: "Stage Energy" },
  ],

  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about/" },
    { label: "Services", href: "/services/" },
    { label: "Gallery", href: "/gallery/" },
    { label: "Contact", href: "/contact/" },
  ],
};

export function waLink(message?: string) {
  return `${site.whatsapp.link}?text=${encodeURIComponent(message || site.whatsapp.message)}`;
}
