"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site, waLink } from "@/config/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "glass shadow-card" : "bg-transparent"
      }`}
    >
      <nav className="container-site flex h-[72px] items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-display text-2xl font-semibold tracking-wide text-ivory">
            Ananya <span className="gold-text">Kundu</span>
          </span>
          <span className="mt-0.5 text-[9px] uppercase tracking-widest2 text-ivory-dim/70">
            Anchor · Emcee · Host
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {site.nav.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative py-2 text-sm tracking-wide transition-colors hover:text-gold ${
                    active ? "text-gold" : "text-ivory/85"
                  }`}
                >
                  {item.label}
                  {active && <span className="absolute -bottom-0.5 left-0 h-px w-full bg-gold" />}
                </Link>
              </li>
            );
          })}
          <li>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-gold !px-6 !py-2.5">
              Book Ananya
            </a>
          </li>
        </ul>

        <button
          className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <span className={`h-px w-6 bg-ivory transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-ivory transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-ivory transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 lg:hidden">
          <ul className="container-site flex flex-col gap-1 py-4">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-lg px-3 py-3 font-display text-xl transition-colors hover:bg-gold/10 hover:text-gold ${
                    pathname === item.href ? "text-gold" : "text-ivory"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 px-3 pb-2">
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
                Book Ananya on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
