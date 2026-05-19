import { PARTNERS } from "@/data/kiki";

export default function PartnersStrip() {
  const loop = [...PARTNERS, ...PARTNERS];
  return (
    <section data-testid="partners-strip" className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-8">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            Our Industry Training Partners
          </div>
          <h3 className="font-display mt-2 text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
            Students train inside India's most respected companies.
          </h3>
        </div>
      </div>

      <div className="overflow-hidden marquee-mask">
        <div className="ticker flex gap-12 whitespace-nowrap">
          {loop.map((p, i) => (
            <div
              key={`${p}-${i}`}
              className="font-display text-2xl sm:text-3xl font-black text-slate-300 hover:text-slate-950 transition-colors uppercase tracking-tight px-4"
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
