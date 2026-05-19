import { useState } from "react";
import { X } from "lucide-react";
import { KIKI } from "@/data/kiki";

export default function WhatsAppButton() {
  const [hover, setHover] = useState(false);
  const message = encodeURIComponent(
    "Hi Kiki Centre! I'd like to know more about admissions 2025."
  );
  const href = `https://wa.me/${KIKI.whatsapp}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      data-testid="whatsapp-floating-button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="flex items-center gap-3">
        <div
          className={`hidden sm:block bg-white border border-slate-200 px-4 py-2.5 shadow-lg transition-all duration-300 ${
            hover ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3 pointer-events-none"
          }`}
        >
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600">
            Chat with us
          </div>
          <div className="text-sm font-semibold text-slate-900">
            Live admission support
          </div>
        </div>
        <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-[#25D366] grid place-items-center shadow-2xl pulse-dot hover:scale-105 transition-transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="h-7 w-7 sm:h-8 sm:w-8 fill-white"
            aria-hidden="true"
          >
            <path d="M19.11 17.43c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15s-.77.97-.95 1.17c-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.62.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35zM16.01 4C9.39 4 4 9.39 4 16c0 2.12.55 4.13 1.6 5.93L4 28l6.27-1.64a11.96 11.96 0 0 0 5.74 1.46h.01c6.62 0 12-5.39 12-12 0-3.2-1.25-6.21-3.51-8.47A11.93 11.93 0 0 0 16.01 4zm0 21.83h-.01a9.93 9.93 0 0 1-5.06-1.38l-.36-.22-3.72.97 1-3.63-.24-.37A9.92 9.92 0 0 1 6.18 16c0-5.43 4.4-9.83 9.83-9.83 2.62 0 5.09 1.02 6.95 2.88a9.78 9.78 0 0 1 2.88 6.95c0 5.43-4.41 9.83-9.83 9.83z" />
          </svg>
        </div>
      </div>
    </a>
  );
}
