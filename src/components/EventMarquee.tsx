const items = [
  "Weddings",
  "Sangeet Nights",
  "Corporate Galas",
  "Award Nights",
  "Brand Launches",
  "College Fests",
  "Cultural Shows",
  "Baby Showers",
  "Live Shows",
];

export default function EventMarquee() {
  const row = items.map((t, i) => (
    <span key={i} className="mx-6 inline-flex items-center gap-6 sm:mx-8 sm:gap-8">
      <span className="font-display text-2xl italic text-ivory/70 sm:text-3xl">{t}</span>
      <span className="text-gold" aria-hidden>✦</span>
    </span>
  ));
  return (
    <div
      className="relative overflow-hidden border-y border-ink-line bg-ink-soft/40 py-5"
      aria-label={`Event types: ${items.join(", ")}`}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" aria-hidden />
      <div className="marquee-track flex w-max" aria-hidden>
        <div className="flex shrink-0 items-center">{row}</div>
        <div className="flex shrink-0 items-center">{row}</div>
      </div>
    </div>
  );
}
