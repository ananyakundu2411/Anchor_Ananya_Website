import Link from "next/link";
import { site, waLink } from "@/config/site";

const policies = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms & Conditions", href: "/terms-and-conditions/" },
  { label: "Copyright Policy", href: "/copyright-policy/" },
  { label: "Cookies Policy", href: "/cookies-policy/" },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-ink-line bg-ink-soft pb-28 lg:pb-0">
      <div className="spotlight-top absolute inset-x-0 top-0 h-40" aria-hidden />
      <div className="container-site relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-3xl font-semibold text-ivory">
            Ananya <span className="gold-text">Kundu</span>
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-widest2 text-ivory-dim/70">
            Anchor · Emcee · Host
          </p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory-dim">
            {site.tagline}. Weddings, corporate events, brand launches and every
            celebration in between — hosted with elegance and energy.
          </p>
        </div>

        <div>
          <h3 className="eyebrow">Quick Links</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {site.nav.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="text-ivory-dim transition-colors hover:text-gold">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Contact</h3>
          <ul className="mt-5 space-y-3 text-sm text-ivory-dim">
            <li>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                WhatsApp: {site.whatsapp.number}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.social.googleBusiness} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                Find on Google Maps
              </a>
            </li>
            <li className="text-ivory-dim/70">{site.location}</li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Follow Ananya</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="text-ivory-dim transition-colors hover:text-gold">
                Instagram
              </a>
            </li>
            <li>
              <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" className="text-ivory-dim transition-colors hover:text-gold">
                YouTube
              </a>
            </li>
            <li>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="text-ivory-dim transition-colors hover:text-gold">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-line">
        <div className="container-site flex flex-col items-center justify-between gap-4 py-6 text-xs text-ivory-dim/70 md:flex-row">
          <p>© {new Date().getFullYear()} Anchor Ananya Kundu. All rights reserved.</p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {policies.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="transition-colors hover:text-gold">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
