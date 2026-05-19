import { MapPin, Phone, Mail, Send } from "lucide-react";
import { KIKI } from "@/data/kiki";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-16 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <img
              src="https://customer-assets.emergentagent.com/job_join-kiki/artifacts/4h36vc80_image.png"
              alt="Kiki Centre for Technology"
              className="h-14 w-auto object-contain"
            />
          </div>
          <p className="mt-5 text-sm text-slate-400 leading-relaxed max-w-sm">
            {KIKI.tagline}. In association with {KIKI.partner}.
          </p>

          <div className="mt-6 space-y-2.5">
            <div className="flex items-start gap-2.5 text-sm">
              <MapPin className="h-4 w-4 mt-0.5 text-yellow-400 flex-shrink-0" />
              <span>{KIKI.address}</span>
            </div>
            <a href={`tel:${KIKI.phoneRaw}`} className="flex items-start gap-2.5 text-sm hover:text-yellow-400 transition-colors">
              <Phone className="h-4 w-4 mt-0.5 text-yellow-400 flex-shrink-0" />
              <span>{KIKI.phone}</span>
            </a>
            <a href={`mailto:${KIKI.email}`} className="flex items-start gap-2.5 text-sm hover:text-yellow-400 transition-colors">
              <Mail className="h-4 w-4 mt-0.5 text-yellow-400 flex-shrink-0" />
              <span>{KIKI.email}</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
            Programs
          </div>
          <ul className="space-y-2 text-sm">
            <li><a href="#courses" className="hover:text-yellow-400">Tool & Die Making</a></li>
            <li><a href="#courses" className="hover:text-yellow-400">Precision Machining</a></li>
            <li><a href="#courses" className="hover:text-yellow-400">Mechatronics</a></li>
            <li><a href="#courses" className="hover:text-yellow-400">Short Term Courses</a></li>
            <li><a href="#courses" className="hover:text-yellow-400">Corporate Training</a></li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
            Get admission updates
          </div>
          <p className="text-sm text-slate-400 mb-4">
            Drop your email — we'll send batch dates, scholarship info & open-day invites.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex border border-slate-700"
          >
            <input
              type="email"
              placeholder="you@example.com"
              data-testid="footer-newsletter-email"
              className="flex-1 bg-transparent px-4 h-12 text-sm placeholder:text-slate-500 outline-none"
            />
            <a
              href="#apply"
              data-testid="footer-newsletter-cta"
              className="btn-yellow inline-flex items-center justify-center px-4 h-12 font-bold text-sm"
            >
              <Send className="h-4 w-4" />
            </a>
          </form>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} Kiki Centre for Technology. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-yellow-400">Privacy</a>
            <a href="#" className="hover:text-yellow-400">Terms</a>
            <a href="#faq" className="hover:text-yellow-400">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
