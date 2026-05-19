import { STATS } from "@/data/kiki";

export default function StatsStrip() {
  return (
    <section data-testid="stats-strip" className="border-y border-slate-900 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-800">
        {STATS.map((s) => (
          <div key={s.label} className="px-5 sm:px-8 py-7 sm:py-10">
            <div className="font-display text-3xl sm:text-5xl font-black tracking-tighter">
              {s.value}
              {s.suffix && (
                <span className="text-yellow-400 text-lg sm:text-2xl font-bold ml-1">
                  {s.suffix}
                </span>
              )}
            </div>
            <div className="mt-1.5 text-xs sm:text-sm uppercase tracking-[0.18em] text-slate-400">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
