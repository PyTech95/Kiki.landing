import { STATS } from "@/data/kiki";

export default function StatsStrip() {
  return (
    <section data-testid="stats-strip" className="border-y border-slate-900 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-800">
        {STATS.map((s) => (
          <div key={s.label} className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 min-w-0">
            <div className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tighter leading-none flex items-baseline gap-1 flex-wrap">
              <span>{s.value}</span>
              {s.suffix && (
                <span className="text-yellow-400 text-xs sm:text-sm lg:text-base xl:text-xl font-bold whitespace-nowrap">
                  {s.suffix}
                </span>
              )}
            </div>
            <div className="mt-2 text-[10px] sm:text-xs lg:text-sm uppercase tracking-[0.18em] text-slate-400 leading-tight">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
