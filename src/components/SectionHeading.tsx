import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  sub,
  center = true,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "text-center" : ""}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-balance font-display text-4xl font-semibold leading-tight text-ivory sm:text-5xl">
        {title}
      </h2>
      {sub && (
        <p className={`mt-4 max-w-2xl text-balance text-base leading-relaxed text-ivory-dim ${center ? "mx-auto" : ""}`}>
          {sub}
        </p>
      )}
      <div className={`mt-6 ${center ? "divider-gold" : "h-px w-24 bg-gradient-to-r from-gold to-transparent"}`} />
    </Reveal>
  );
}
