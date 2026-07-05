import Link from "next/link";
import Reveal from "./Reveal";
import { waLink } from "@/config/site";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0" aria-hidden>
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: "url(/media/hero/hero-lights.jpg)" }}
        />
        <div className="absolute inset-0 bg-ink/85" />
        <div className="spotlight-top absolute inset-x-0 top-0 h-full" />
      </div>

      <Reveal className="container-site relative text-center">
        <p className="eyebrow">Your Event Deserves This Energy</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-balance font-display text-4xl font-semibold leading-tight text-ivory sm:text-6xl">
          Ready to Make Your Event <span className="gold-text-animated">Unforgettable?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-balance text-ivory-dim">
          Dates fill fast during wedding and festive season. Share your event
          details today and get a response within hours.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            Check Date on WhatsApp
          </a>
          <Link href="/contact/" className="btn-ghost">
            Send Enquiry
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
