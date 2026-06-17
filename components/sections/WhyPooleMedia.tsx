"use client";

import { StatCounter } from "@/components/shared/StatCounter";

const STATS = [
  {
    value: 3,
    suffix: "×",
    label: "Faster Builds",
    description: "Compared to template agencies",
  },
  {
    value: 2,
    prefix: "<",
    suffix: "s",
    label: "Avg. Page Load",
    description: "Sub-2-second sites, guaranteed",
  },
  {
    value: 4,
    label: "AI Search Engines",
    description: "ChatGPT, Perplexity, Grok & Google",
  },
];

export function WhyPooleMedia() {
  return (
    <section className="py-24 md:py-32 bg-[#060610]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
            Why Poole Media
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-5">
            Results you can{" "}
            <span className="text-gradient">measure</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            We don&apos;t just build pretty websites — we build digital assets
            engineered for speed, AI visibility, and consistent lead generation.
          </p>
        </div>

        {/* Stat counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 md:gap-8">
          {STATS.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>

        {/* Supporting copy */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "AI-First, Not AI-Afterthought",
              body: "We structure your content and technical SEO specifically for how AI engines like ChatGPT, Perplexity, and Grok understand and surface local business results.",
            },
            {
              title: "No Lock-In Contracts",
              body: "We earn your business every month. If you're not seeing results, you're free to walk away — no cancellation fees, no fine print.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-7"
            >
              <h3 className="text-base font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
