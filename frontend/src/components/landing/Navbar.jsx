import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { KIKI } from "@/data/kiki";

const NAV = [
  { href: "#courses", label: "Courses" },
  { href: "#earn", label: "Earn While You Learn" },
  { href: "#why", label: "Why Kiki" },
  { href: "#apply", label: "Apply" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "bg-white/70 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between gap-4">
        <a href="#top" data-testid="navbar-logo" className="flex items-center gap-2.5 group">
          <img
            src="https://customer-assets.emergentagent.com/job_join-kiki/artifacts/4h36vc80_image.png"
            alt="Kiki Centre for Technology"
            className="h-11 sm:h-12 w-auto object-contain"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-testid={`nav-link-${n.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-medium text-slate-700 hover:text-slate-950 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-yellow-400 hover:after:w-full after:transition-all"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${KIKI.phoneRaw}`}
            data-testid="navbar-call-button"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-slate-700"
          >
            <Phone className="h-4 w-4" />
            {KIKI.phone}
          </a>
          <a
            href="#apply"
            data-testid="navbar-apply-button"
            className="btn-yellow inline-flex items-center px-4 sm:px-5 h-10 sm:h-11 text-sm font-bold uppercase tracking-wider"
          >
            Apply Now
          </a>
          <button
            aria-label="Toggle menu"
            data-testid="navbar-mobile-toggle"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden h-10 w-10 grid place-items-center border border-slate-300"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-4 flex flex-col gap-3">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-2 text-base font-medium text-slate-800 border-b border-slate-100"
              >
                {n.label}
              </a>
            ))}
            <a
              href={`tel:${KIKI.phoneRaw}`}
              className="flex items-center gap-2 text-sm font-semibold text-slate-900 py-2"
            >
              <Phone className="h-4 w-4" /> {KIKI.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
