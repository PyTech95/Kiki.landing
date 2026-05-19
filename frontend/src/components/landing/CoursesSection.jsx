import { COURSES } from "@/data/kiki";
import { ArrowUpRight, Clock, GraduationCap } from "lucide-react";

export default function CoursesSection() {
  return (
    <section id="courses" data-testid="courses-section" className="py-16 sm:py-24 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
              Long Term Courses · 3.5 Years
            </div>
            <h2 className="font-display mt-3 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-slate-950 leading-[1.02] sm:leading-[0.95] text-balance">
              Three German-certified
              <br />
              paths to your career.
            </h2>
          </div>
          <p className="max-w-md text-slate-600 leading-relaxed">
            Choose a stream — Mechanical or Electrical & Electronics — and join a
            curriculum designed by German experts and Indian industry specialists.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSES.map((c, i) => (
            <article
              key={c.id}
              data-testid={`course-card-${c.id}`}
              className="group border border-slate-900 bg-white flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 border-b border-slate-900">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-yellow-400 text-slate-950 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em]">
                  {c.stream}
                </div>
                <div className="absolute top-3 right-3 bg-white/95 text-slate-950 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                  0{i + 1}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display text-2xl font-bold text-slate-950 tracking-tight">
                  {c.title}
                </h3>
                <p className="text-sm text-sky-700 font-medium mt-1">{c.subtitle}</p>

                <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-600">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {c.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5" /> {c.eligibility}
                  </span>
                </div>

                <ul className="mt-5 space-y-2">
                  {c.highlights.map((h) => (
                    <li key={h} className="text-sm text-slate-700 flex items-start gap-2">
                      <span className="mt-2 h-1 w-3 bg-yellow-400 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider">
                    Cert: HWK Koblenz
                  </span>
                  <a
                    href="#apply"
                    data-testid={`course-apply-${c.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-950 hover:text-sky-700 transition-colors"
                  >
                    Apply <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
