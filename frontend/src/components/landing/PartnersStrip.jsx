const PARTNERS = [
  {
    name: "Hi-Lex",
    url: "https://customer-assets.emergentagent.com/job_join-kiki/artifacts/hgo71pph_image.png",
  },
  {
    name: "Subros",
    url: "https://customer-assets.emergentagent.com/job_join-kiki/artifacts/ekgoppv5_image.png",
  },
  {
    name: "IFB",
    url: "https://customer-assets.emergentagent.com/job_join-kiki/artifacts/wmcorte3_image.png",
  },
  {
    name: "Nagata",
    url: "https://customer-assets.emergentagent.com/job_join-kiki/artifacts/sxfu5imk_image.png",
  },
  {
    name: "AIS",
    url: "https://customer-assets.emergentagent.com/job_join-kiki/artifacts/jumf6tnf_image.png",
  },
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
        <div className="ticker-reverse flex items-center gap-12 sm:gap-16 whitespace-nowrap py-4">
          {loop.map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              data-testid={`partner-logo-${p.name.toLowerCase()}-${i}`}
              className="flex-shrink-0 h-16 sm:h-20 w-32 sm:w-44 grid place-items-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
              title={p.name}
            >
              <img
                src={p.url}
                alt={`${p.name} logo`}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
