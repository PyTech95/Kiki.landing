import { useState } from "react";
import { Play } from "lucide-react";

const VIDEO_ID = "d_EqZEkFdNM";
const THUMB = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;
const FALLBACK_THUMB = `https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`;

export default function HeroVideo() {
  const [active, setActive] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative">
      {/* Yellow offset frame (industrial style) */}
      <div className="absolute -inset-2 sm:-inset-3 bg-yellow-400 -z-10 hidden sm:block" />
      <div className="absolute -inset-2 sm:-inset-3 translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3 border-2 border-slate-950 -z-20 hidden sm:block" />

      <div
        data-testid="hero-video-frame"
        className="relative aspect-video sm:aspect-[4/5] overflow-hidden bg-slate-950 border-2 border-slate-950 shadow-2xl"
      >
        {active ? (
          <iframe
            data-testid="hero-video-iframe"
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title="Kiki Centre for Technology — Campus Tour"
            allow="accelerated-2d-canvas; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            data-testid="hero-video-play"
            aria-label="Play campus tour video"
            className="absolute inset-0 w-full h-full group"
          >
            <img
              src={imgError ? FALLBACK_THUMB : THUMB}
              onError={() => setImgError(true)}
              alt="Kiki Centre for Technology — Campus tour"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="eager"
            />

            {/* Cinema bars + gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-slate-950/20" />

            {/* Play button */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-yellow-400/40 blur-2xl scale-150 animate-pulse" />
                <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-yellow-400 grid place-items-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="h-7 w-7 sm:h-9 sm:w-9 text-slate-950 ml-1 fill-slate-950" />
                </div>
                <span className="absolute inset-0 rounded-full border-2 border-yellow-400/60 animate-ping" />
              </div>
            </div>

            {/* Bottom caption */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 text-left">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-yellow-400 text-slate-950 text-[10px] font-bold uppercase tracking-[0.18em] mb-2 sm:mb-3">
                <span className="h-1.5 w-1.5 bg-slate-950 rounded-full animate-pulse" />
                Watch · Campus Tour
              </div>
              <div className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight tracking-tight">
                Step inside our 25,000 sq ft<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>training centre.
              </div>
            </div>

            {/* Corner ticks (industrial frame motif) */}
            <span className="absolute top-2 left-2 h-4 w-4 border-t-2 border-l-2 border-yellow-400" />
            <span className="absolute top-2 right-2 h-4 w-4 border-t-2 border-r-2 border-yellow-400" />
            <span className="absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-yellow-400" />
            <span className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-yellow-400" />
          </button>
        )}
      </div>

      {/* Floating badges (desktop only) */}
      <div className="hidden sm:flex absolute -left-6 top-10 bg-white border-2 border-slate-950 px-4 py-3 shadow-lg float-bounce z-10">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-bold">
            Stipend
          </div>
          <div className="font-display text-2xl font-black text-slate-950">₹ Earn</div>
          <div className="text-xs text-slate-600">while you learn</div>
        </div>
      </div>

      <div className="hidden sm:block absolute -right-4 -bottom-4 bg-slate-950 text-white px-5 py-4 max-w-[220px] border-2 border-slate-950 z-10">
        <div className="text-[10px] uppercase tracking-[0.18em] text-yellow-400 font-bold">
          Certified by
        </div>
        <div className="font-display text-base font-bold leading-tight mt-1">
          German Chamber of Skilled Crafts, Koblenz 🇩🇪
        </div>
      </div>
    </div>
  );
}
