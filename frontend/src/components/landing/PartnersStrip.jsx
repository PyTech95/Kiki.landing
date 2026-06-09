const PARTNERS = [
  {
    type: "image",
    name: "Hi-Lex",
    url: "https://customer-assets.emergentagent.com/job_join-kiki/artifacts/hgo71pph_image.png",
  },
  {
    type: "image",
    name: "Subros",
    url: "https://customer-assets.emergentagent.com/job_join-kiki/artifacts/ekgoppv5_image.png",
  },
  {
    type: "image",
    name: "IFB",
    url: "https://customer-assets.emergentagent.com/job_join-kiki/artifacts/wmcorte3_image.png",
  },
  {
    type: "image",
    name: "Nagata",
    url: "https://customer-assets.emergentagent.com/job_join-kiki/artifacts/sxfu5imk_image.png",
  },
  {
    type: "image",
    name: "AIS",
    url: "https://customer-assets.emergentagent.com/job_join-kiki/artifacts/jumf6tnf_image.png",
  },
  { type: "text", name: "Boston Scientific" },
  { type: "text", name: "Rico" },
  { type: "text", name: "Roop" },
  { type: "text", name: "Ensto" },
  { type: "text", name: "Spinks" },
];

export default function PartnersStrip() {
  const loop = [...PARTNERS, ...PARTNERS, ...PARTNERS];
  return (
    <section
      data-testid="partners-strip"
      className="py-14 sm:py-20 bg-white border-b border-slate-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-10">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            Our Training Partners
          </div>
          <h3 className="font-display mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 tracking-tight">
            Students train inside India's most respected companies.
          </h3>
        </div>
      </div>

      <div className="overflow-hidden marquee-mask">
        <div className="ticker-reverse flex items-center gap-10 sm:gap-14 whitespace-nowrap py-4">
          {loop.map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              data-testid={`partner-${p.name.toLowerCase().replace(/\s+/g, "-")}-${i}`}
              className="flex-shrink-0 h-16 sm:h-20 grid place-items-center px-2"
              title={p.name}
            >
              {p.type === "image" ? (
                <div className="w-32 sm:w-44 h-full grid place-items-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300">
                  <img
                    src={p.url}
                    alt={`${p.name} logo`}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-300 hover:text-slate-950 transition-colors px-2">
                  {p.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
