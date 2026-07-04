import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import EnquiryForm from "@/components/EnquiryForm";
import { site, waLink } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact & Booking — Enquire for Your Event",
  description:
    "Book Anchor Ananya Kundu for your wedding, corporate event, brand launch or celebration. Enquire on WhatsApp (+91 97658 27880) or send an enquiry form — response within hours.",
  alternates: { canonical: "/contact/" },
};

const channels = [
  {
    label: "WhatsApp (fastest)",
    value: site.whatsapp.number,
    href: waLink(),
    note: "Instant replies for dates & quotes",
  },
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "For detailed briefs & proposals",
  },
  {
    label: "Instagram",
    value: site.social.instagramHandle,
    href: site.social.instagram,
    note: "See her latest events first",
  },
  {
    label: "Google Business",
    value: "Reviews & location",
    href: site.social.googleBusiness,
    note: "Read verified client reviews",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative pb-10 pt-40">
        <div className="spotlight-top absolute inset-x-0 top-0 h-96" aria-hidden />
        <div className="container-site relative">
          <SectionHeading
            eyebrow="Contact & Booking"
            title={
              <>
                Your Date Is Waiting — <span className="gold-text">Let&rsquo;s Lock It In</span>
              </>
            }
            sub="Share your event details and get a response within hours. Peak wedding and festive dates go fast."
          />
        </div>
      </section>

      <section className="py-14">
        <div className="container-site grid gap-10 lg:grid-cols-5">
          {/* Channels */}
          <div className="space-y-4 lg:col-span-2">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-premium group block p-6"
                >
                  <p className="text-[10px] uppercase tracking-widest2 text-gold">{c.label}</p>
                  <p className="mt-1.5 font-display text-xl text-ivory transition-colors group-hover:text-gold">
                    {c.value}
                  </p>
                  <p className="mt-1 text-xs text-ivory-dim/70">{c.note}</p>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.35}>
              <div className="card-premium !translate-y-0 p-6">
                <p className="text-[10px] uppercase tracking-widest2 text-gold">Also on</p>
                <div className="mt-3 flex gap-3">
                  <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-5 !py-2 text-xs">
                    YouTube
                  </a>
                  <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-5 !py-2 text-xs">
                    Facebook
                  </a>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-ivory-dim/70">
                  Based in {site.location} · Available for events across India
                </p>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <EnquiryForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
