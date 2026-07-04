import Reveal from "./Reveal";
import { waLink } from "@/config/site";

const steps = [
  {
    n: "01",
    title: "Share Your Date",
    copy: "Message on WhatsApp or send the enquiry form with your event type, date and city.",
  },
  {
    n: "02",
    title: "Get a Quote in Hours",
    copy: "Receive availability, a tailored quote and ideas for your event's flow — fast.",
  },
  {
    n: "03",
    title: "Lock It In",
    copy: "Confirm with a simple advance and Ananya starts prepping your script and schedule.",
  },
];

export default function BookingSteps() {
  return (
    <section className="relative border-t border-ink-line py-20">
      <div className="container-site">
        <Reveal className="text-center">
          <p className="eyebrow">Booking Made Simple</p>
          <h2 className="mt-3 text-balance font-display text-4xl font-semibold text-ivory sm:text-5xl">
            Booked in <span className="gold-text">Three Easy Steps</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12}>
              <div className="relative h-full rounded-2xl border border-ink-line bg-ink-card p-8 text-center">
                <span
                  className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-gold/50 bg-ink font-display text-lg text-gold shadow-glow"
                  aria-hidden
                >
                  {s.n}
                </span>
                <h3 className="mt-4 font-display text-2xl text-ivory">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory-dim">{s.copy}</p>
                {i < steps.length - 1 && (
                  <span className="absolute -right-5 top-1/2 hidden -translate-y-1/2 text-gold/40 sm:block" aria-hidden>
                    →
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            Start With Step One
          </a>
        </Reveal>
      </div>
    </section>
  );
}
