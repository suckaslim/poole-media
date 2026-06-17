const TRUST_ITEMS = [
  { stat: "< 2s", label: "Page Load Times" },
  { stat: "AI-Ready", label: "ChatGPT · Perplexity · Grok · Google" },
  { stat: "No Contracts", label: "Cancel Anytime" },
  { stat: "Mobile-First", label: "Every Build, By Default" },
  { stat: "Tri-Cities, WA", label: "Serving Businesses Nationwide" },
];

export function SocialProof() {
  return (
    <section className="relative py-5 bg-[#060610] border-y border-white/[0.06] overflow-hidden">
      {/* Gradient fades on edges for scroll effect */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#060610] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#060610] to-transparent z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {TRUST_ITEMS.map((item, i) => (
            <div key={i} className="flex items-center gap-3 shrink-0">
              {i > 0 && (
                <div className="hidden sm:block h-4 w-px bg-white/[0.12]" />
              )}
              <div className="flex flex-col items-center sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                <span className="text-sm font-bold text-white/90 tracking-tight">
                  {item.stat}
                </span>
                <span className="text-xs text-white/35">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
