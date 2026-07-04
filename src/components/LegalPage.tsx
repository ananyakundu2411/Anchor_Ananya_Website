import Reveal from "./Reveal";

export type LegalSection = { heading: string; body: string[] };

export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <section className="relative pb-24 pt-40">
      <div className="spotlight-top absolute inset-x-0 top-0 h-72" aria-hidden />
      <div className="container-site relative mx-auto max-w-3xl">
        <Reveal>
          <p className="eyebrow">Legal</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ivory sm:text-5xl">{title}</h1>
          <p className="mt-2 text-xs uppercase tracking-widest2 text-ivory-dim/60">
            Last updated: {updated}
          </p>
          <div className="mt-6 h-px w-24 bg-gradient-to-r from-gold to-transparent" />
          <p className="mt-8 leading-relaxed text-ivory-dim">{intro}</p>
        </Reveal>

        <div className="mt-10 space-y-10">
          {sections.map((s) => (
            <Reveal key={s.heading}>
              <h2 className="font-display text-2xl text-gold">{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-3 text-sm leading-relaxed text-ivory-dim">
                  {p}
                </p>
              ))}
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-14 rounded-xl border border-gold/25 bg-gold/5 p-5 text-xs leading-relaxed text-ivory-dim">
            Note: This page uses general wording suitable for a personal brand and
            event-services website. It should be reviewed by a legal professional
            before final publication.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
