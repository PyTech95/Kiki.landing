import { ArrowRight, CheckCircle2, Phone, Award } from "lucide-react";
import { KIKI } from "@/data/kiki";

export default function Hero() {
  return (
    <section id="top" data-testid="hero-section" className="relative pt-20 sm:pt-28 lg:pt-32 pb-14 lg:pb-20 overflow-hidden">
      <div className="absolute inset-0 grid-noise opacity-60 pointer-events-none" />
      <div className="absolute top-32 -right-20 h-72 w-72 bg-yellow-400/20 blur-3xl rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left content */}
        <div className="lg:col-span-7 reveal-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-slate-900 bg-yellow-400 text-slate-950">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-900"></span>
            </span>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em]">
              Admissions Open · Batch 2026
            </span>
          </div>

          <h1
            data-testid="hero-headline"
            className="font-display mt-5 sm:mt-6 text-[2.25rem] leading-[1.02] sm:text-6xl lg:text-7xl font-black tracking-tighter text-slate-950 sm:leading-[0.95] text-balance"
          >
            Build the skills{" "}
            <span className="relative inline-block">
              <span className="relative z-10">India</span>
              <span className="absolute inset-x-0 bottom-1 sm:bottom-2 h-3 sm:h-4 bg-yellow-400 -z-0"></span>
            </span>{" "}
            actually pays for.
          </h1>

          <p className="mt-5 max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed">
            German-certified 3.5-year diploma programs in Tool & Die Making,
            Precision Machining and Mechatronics — designed with Indo-German
            experts. <strong className="text-slate-900">Earn a stipend</strong> while you learn from Year 2.
          </p>

          <ul className="mt-6 grid sm:grid-cols-2 gap-2.5 max-w-xl">
            {[
              "German Chamber of Skilled Crafts certified",
              "Earn While You Learn from Year 2",
              "Class 10 / 12 pass eligible (any stream)",
              "Industry-ready in 3.5 years",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm sm:text-[15px] text-slate-700">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="#apply"
              data-testid="hero-apply-button"
              className="btn-yellow inline-flex items-center justify-center gap-2 px-7 h-14 text-base font-bold uppercase tracking-wider group"
            >
              Apply for Admission
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={`tel:${KIKI.phoneRaw}`}
              data-testid="hero-call-button"
              className="inline-flex items-center justify-center gap-2 px-7 h-14 text-base font-bold border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-colors"
            >
              <Phone className="h-5 w-5" />
              Call {KIKI.phone}
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3 text-xs text-slate-500">
            <Award className="h-4 w-4" />
            <span>In association with HWK Koblenz, Germany · IMT Manesar Campus</span>
          </div>
        </div>

        {/* Right visual */}
        <div className="lg:col-span-5 relative reveal-up" style={{ animationDelay: "120ms" }}>
          <div className="relative">
            {/* Image card */}
            <div className="relative aspect-[4/3] sm:aspect-[4/5] overflow-hidden bg-slate-100 border border-slate-900">
              <img
                src="https://images.unsplash.com/photo-1666634157070-6fd830fb5672?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwxfHxjbmMlMjBtYWNoaW5lJTIwbWFudWZhY3R1cmluZyUyMHByZWNpc2lvbnxlbnwwfHx8fDE3NzkxODM5MzB8MA&ixlib=rb-4.1.0&q=85"
                alt="Precision CNC manufacturing training"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-[11px] uppercase tracking-[0.2em] text-yellow-400 font-bold">
                  On Campus · IMT Manesar
                </div>
                <div className="font-display text-2xl sm:text-3xl font-bold mt-1">
                  55,000 sq ft of practical learning
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="hidden sm:flex absolute -left-6 top-10 bg-white border border-slate-900 px-4 py-3 shadow-lg float-bounce">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-bold">Stipend</div>
                <div className="font-display text-2xl font-black text-slate-950">₹ Earn</div>
                <div className="text-xs text-slate-600">while you learn</div>
              </div>
            </div>

            <div className="hidden sm:block absolute -right-4 -bottom-4 bg-slate-950 text-white px-5 py-4 max-w-[220px]">
              <div className="text-[10px] uppercase tracking-[0.18em] text-yellow-400 font-bold">
                Certified by
              </div>
              <div className="font-display text-base font-bold leading-tight mt-1">
                German Chamber of Skilled Crafts, Koblenz 🇩🇪
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
