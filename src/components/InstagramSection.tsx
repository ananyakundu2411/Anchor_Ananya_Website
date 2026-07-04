import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import VideoCard from "./VideoCard";
import { instagramProfile, localReels } from "@/config/instagram";
import { site } from "@/config/site";

export default function InstagramSection() {
  return (
    <section className="relative py-24">
      <div className="spotlight-top absolute inset-x-0 top-0 h-64" aria-hidden />
      <div className="container-site relative">
        <SectionHeading
          eyebrow="On the Reel"
          title={
            <>
              Moments From <span className="gold-text">{site.social.instagramHandle}</span>
            </>
          }
          sub="Stage energy, client moments and behind-the-scenes — straight from Ananya's world."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {localReels.map((r, i) => (
            <Reveal key={r.src} delay={i * 0.08} className={i % 2 === 1 ? "sm:mt-10" : ""}>
              <VideoCard src={r.src} poster={r.poster} label={r.label} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <a href={instagramProfile} target="_blank" rel="noopener noreferrer" className="btn-gold">
            Follow Ananya on Instagram
          </a>
        </Reveal>
      </div>
    </section>
  );
}
