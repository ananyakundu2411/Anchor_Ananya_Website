import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import GalleryClient from "@/components/GalleryClient";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Gallery — Weddings, Corporate & Celebrations",
  description:
    "Browse real photos and videos of Anchor Ananya Kundu hosting weddings, sangeets, corporate events, brand launches, college festivals, cultural shows and private celebrations.",
  alternates: { canonical: "/gallery/" },
};

export default function GalleryPage() {
  return (
    <>
      <section className="relative pb-10 pt-40">
        <div className="spotlight-top absolute inset-x-0 top-0 h-96" aria-hidden />
        <div className="container-site relative">
          <SectionHeading
            eyebrow="Portfolio"
            title={
              <>
                Stages That Tell <span className="gold-text">Stories</span>
              </>
            }
            sub="Every frame below is a real event — filter by occasion and step into the moment. Tap any card to view it full-screen."
          />
        </div>
      </section>

      <section className="pb-24 pt-6">
        <div className="container-site">
          <GalleryClient />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
