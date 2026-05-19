import { useEffect, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { KIKI } from "@/data/kiki";

export default function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      data-testid="sticky-mobile-cta"
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-30 transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-slate-950 border-t border-yellow-400 grid grid-cols-2">
        <a
          href={`tel:${KIKI.phoneRaw}`}
          className="flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-white border-r border-slate-800"
        >
          <Phone className="h-4 w-4 text-yellow-400" />
          Call Now
        </a>
        <a
          href="#apply"
          className="btn-yellow flex items-center justify-center gap-2 py-3.5 text-sm font-bold uppercase tracking-wider"
        >
          Apply Now
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
