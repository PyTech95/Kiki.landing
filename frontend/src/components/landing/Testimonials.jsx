import { TESTIMONIALS } from "@/data/kiki";
import { Quote, Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section data-testid="testimonials-section" className="py-16 sm:py-24 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
            Student Speak
          </div>
          <h2 className="font-display mt-3 text-3xl sm:text-5xl font-black tracking-tighter text-slate-950 leading-[1.02] sm:leading-[0.95]">
            Real students. Real careers.
          </h2>
        </div>

        <div className="mt-10 sm:mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className="border border-slate-900 bg-slate-50 p-6 sm:p-8 hover:bg-yellow-50 transition-colors flex flex-col"
            >
              <Quote className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
              <blockquote className="mt-4 text-base sm:text-lg text-slate-900 leading-relaxed font-medium">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-slate-300 flex items-center justify-between">
                <div>
                  <div className="font-display font-bold text-slate-950">{t.name}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">
                    {t.course}
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
