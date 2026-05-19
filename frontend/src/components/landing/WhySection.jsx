import { Building2, Cog, Globe2, ShieldCheck, BookOpen, Users } from "lucide-react";

const REASONS = [
  {
    icon: Globe2,
    title: "International Curriculum",
    desc: "Designed by German experts, continuously updated to global manufacturing standards.",
  },
  {
    icon: ShieldCheck,
    title: "Certified by HWK Koblenz",
    desc: "Recognised qualification from the German Chamber of Skilled Crafts.",
  },
  {
    icon: Building2,
    title: "55,000 sq ft Campus",
    desc: "Well-equipped classrooms, workshops, simulators and industrial machinery.",
  },
  {
    icon: Cog,
    title: "Real Industry Tools",
    desc: "Train on actual CNCs, PLCs, robotics platforms used in modern Indian factories.",
  },
  {
    icon: BookOpen,
    title: "Theory + Practical",
    desc: "Strong fundamentals paired with practical hands-on workshop time every day.",
  },
  {
    icon: Users,
    title: "World-class Faculty",
    desc: "Indo-German trained instructors with deep industry experience.",
  },
];

export default function WhySection() {
  return (
    <section id="why" data-testid="why-section" className="py-20 sm:py-28 bg-slate-50 border-y border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
            Why Kiki Centre
          </div>
          <h2 className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-slate-950 leading-[0.95] text-balance">
            Built like a German workshop.<br />
            Priced for India.
          </h2>
          <p className="mt-5 text-slate-600 text-base sm:text-lg leading-relaxed">
            We make the people who will make in India. Supported by a World Bank
            reflows programme, the German Chamber of Skilled Crafts and leading
            Indian industry partners.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-slate-300 border border-slate-300">
          {REASONS.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.title} className="bg-white p-6 sm:p-8 hover:bg-yellow-50 transition-colors">
                <div className="h-11 w-11 bg-slate-950 grid place-items-center mb-5">
                  <Icon className="h-5 w-5 text-yellow-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-950">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
