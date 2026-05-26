import { ArrowRight, Phone } from "lucide-react";
import { KIKI } from "@/data/kiki";

export default function CtaBand() {
  return (
    <section data-testid="cta-band" className="py-16 sm:py-24 lg:py-28 bg-yellow-400 relative overflow-hidden">
      <div className="absolute -bottom-20 -right-20 h-72 w-72 bg-slate-950/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row md:items-center justify-between gap-7 sm:gap-8">
        <div className="max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900/70">
            Don't wait for next year
          </div>
          <h2 className="font-display mt-3 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-slate-950 leading-[1.02] sm:leading-[0.95] text-balance">
            Your career starts the day you apply.
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:flex-shrink-0">
          <a
            href="#apply"
            data-testid="cta-band-apply"
            className="bg-slate-950 text-white inline-flex items-center justify-center gap-2 px-6 sm:px-7 h-12 sm:h-14 font-bold uppercase tracking-wider text-sm sm:text-base hover:bg-slate-800 transition-colors group shine-on-hover"
          >
            Apply Now
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={`tel:${KIKI.phoneRaw}`}
            data-testid="cta-band-call"
            className="bg-white text-slate-950 inline-flex items-center justify-center gap-2 px-6 sm:px-7 h-12 sm:h-14 font-bold uppercase tracking-wider text-sm sm:text-base border-2 border-slate-950 hover:bg-slate-100 transition-colors"
          >
            <Phone className="h-5 w-5" />
            Talk to Counsellor
          </a>
        </div>
      </div>
    </section>
  );
}
