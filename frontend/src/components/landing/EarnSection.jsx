import { ArrowRight, Banknote, Factory, GraduationCap, Award } from "lucide-react";

const POINTS = [
  {
    icon: GraduationCap,
    title: "Year 1 — Foundation",
    desc: "Theory + intensive workshop training at our 55,000 sq ft IMT Manesar campus.",
  },
  {
    icon: Factory,
    title: "Year 2 onwards — On-Job Training",
    desc: "Train inside India's top manufacturing companies (Maruti, Honda, Mitsubishi).",
  },
  {
    icon: Banknote,
    title: "Monthly Stipend",
    desc: "Receive a training allowance from the partner company every month.",
  },
  {
    icon: Award,
    title: "German-certified Diploma",
    desc: "Internationally recognised qualification on completion of 3.5 years.",
  },
];

export default function EarnSection() {
  return (
    <section id="earn" data-testid="earn-section" className="py-16 sm:py-24 lg:py-28 bg-yellow-400 relative overflow-hidden grain">
      <div className="absolute -top-24 -right-24 h-72 w-72 bg-slate-950/10 rounded-full blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900/70">
              The Kiki Advantage
            </div>
            <h2 className="font-display mt-3 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-slate-950 leading-[1.02] sm:leading-[0.95]">
              First time in India.{" "}
              <span className="block underline decoration-slate-950 decoration-[4px] sm:decoration-[6px] underline-offset-4">
                Earn while you learn.
              </span>
            </h2>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-900/80 leading-relaxed max-w-md">
              Modelled after Germany's famous "Berufsschule" dual-training system —
              one of the most successful in the world. Students don't just learn
              skills, they earn money while building a real career.
            </p>
            <a
              href="#apply"
              data-testid="earn-cta-button"
              className="mt-7 sm:mt-8 inline-flex items-center gap-2 bg-slate-950 text-white px-6 sm:px-7 h-12 sm:h-13 py-3 sm:py-4 font-bold uppercase tracking-wider text-sm sm:text-base hover:bg-slate-800 transition-colors group"
            >
              Reserve My Seat
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {POINTS.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="bg-white border-2 border-slate-950 p-6 card-lift"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="h-7 w-7 text-slate-950" />
                    <span className="font-display text-3xl font-black text-slate-200">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-slate-950">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
