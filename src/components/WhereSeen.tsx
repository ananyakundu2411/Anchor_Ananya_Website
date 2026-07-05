import Reveal from "./Reveal";
import { whereSeen } from "@/config/content.config";

/**
 * "Where You've Seen Her Host" — event-type credibility strip.
 * Premium small image tiles instead of media logos.
 */
export default function WhereSeen() {
  return (
    <section className="relative border-y border-ink-line bg-ink-soft/40 py-16">
      <div className="container-site">
        <Reveal className="text-center">
          <p className="eyebrow">Where You&rsquo;ve Seen Her Host</p>
        </Reveal>
        <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-7">
          {whereSeen.map((w, i) => (
            <Reveal key={w.label} delay={(i % 7) * 0.05}>
              <figure className="group relative overflow-hidden rounded-xl border border-ink-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={w.src}
                  alt={`Anchor Ananya Kundu hosting ${w.label.toLowerCase()}`}
                  loading="lazy"
                  decoding="async"
                  className="img-grade aspect-square w-full object-cover object-top opacity-90 transition-all duration-500 group-hover:scale-[1.05] group-hover:opacity-100"
                />
                <div className="card-scrim pointer-events-none absolute inset-x-0 bottom-0 h-3/5" />
                <figcaption className="absolute inset-x-0 bottom-0 p-2 text-center">
                  <span className="text-[10px] font-semibold uppercase tracking-widest2 text-ivory drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] sm:text-[11px]">
                    {w.label}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
