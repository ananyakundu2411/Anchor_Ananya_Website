import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { site } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Professional Anchor & Emcee | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Anchor Ananya Kundu",
    "female anchor in India",
    "wedding anchor",
    "corporate event anchor",
    "emcee for events",
    "event host in India",
    "anchor for sangeet",
    "professional host for corporate events",
  ],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Professional Anchor & Emcee`,
    description: site.description,
    images: [
      { url: "/media/hero/hero-stage.jpg", width: 1200, height: 1600, alt: "Anchor Ananya Kundu on stage" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Professional Anchor & Emcee`,
    description: site.description,
    images: ["/media/hero/hero-stage.jpg"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: "Ananya Kundu",
      alternateName: "Anchor Ananya Kundu",
      jobTitle: "Professional Anchor & Emcee",
      description: site.description,
      email: `mailto:${site.email}`,
      telephone: site.whatsapp.number,
      url: site.url,
      image: `${site.url}/media/hero/hero-stage.jpg`,
      sameAs: [site.social.instagram, site.social.youtube, site.social.facebook],
      address: { "@type": "PostalAddress", addressLocality: "Navi Mumbai", addressRegion: "Maharashtra", addressCountry: "IN" },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${site.url}/#business`,
      name: site.name,
      description: site.description,
      url: site.url,
      email: site.email,
      telephone: site.whatsapp.number,
      image: `${site.url}/media/hero/hero-stage.jpg`,
      priceRange: "₹₹",
      areaServed: "India",
      address: { "@type": "PostalAddress", addressLocality: "Navi Mumbai", addressRegion: "Maharashtra", addressCountry: "IN" },
      founder: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "Service",
      "@id": `${site.url}/#service`,
      serviceType: "Event Anchoring & Emcee Services",
      provider: { "@id": `${site.url}/#person` },
      areaServed: "India",
      description:
        "Professional anchoring for weddings, sangeets, corporate events, award nights, brand launches, college events, cultural shows, private celebrations and live shows.",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
