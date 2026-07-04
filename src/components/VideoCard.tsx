"use client";

import { useRef, useState } from "react";

export default function VideoCard({
  src,
  poster,
  label,
  aspect = "aspect-[9/16]",
}: {
  src: string;
  poster: string;
  label?: string;
  aspect?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div className={`card-premium group ${aspect} w-full`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        preload="none"
        playsInline
        onEnded={() => setPlaying(false)}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <button
        onClick={toggle}
        aria-label={playing ? `Pause ${label ?? "video"}` : `Play ${label ?? "video"}`}
        className="absolute inset-0 flex items-center justify-center"
      >
        {!playing && (
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 bg-ink/60 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-gold" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        )}
      </button>
      {label && !playing && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4">
          <p className="font-display text-lg text-ivory">{label}</p>
        </div>
      )}
    </div>
  );
}
