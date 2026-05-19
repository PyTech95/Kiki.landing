import { FAQS } from "@/data/kiki";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqSection() {
  return (
    <section id="faq" data-testid="faq-section" className="py-16 sm:py-24 lg:py-28 bg-slate-50 border-y border-slate-200">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
        <div className="text-center">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
            Frequently Asked
          </div>
          <h2 className="font-display mt-3 text-3xl sm:text-5xl font-black tracking-tighter text-slate-950 leading-[1.02] sm:leading-[0.95]">
            Questions, answered.
          </h2>
          <p className="mt-4 text-slate-600">
            Still unsure? Chat with our AI assistant or message us on WhatsApp — both at the corners of your screen.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-10 border-t border-slate-300">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              data-testid={`faq-item-${i}`}
              className="border-b border-slate-300"
            >
              <AccordionTrigger className="text-left font-display text-base sm:text-lg font-bold text-slate-950 hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
