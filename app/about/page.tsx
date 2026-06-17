import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight, Zap, Shield, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "About — AI-Driven Marketing Agency in Tri-Cities, WA",
  description:
    "Poole Media is a digital marketing agency in Tri-Cities, WA. We help small and mid-sized businesses compete and win in the era of AI-powered search.",
  openGraph: {
    title: "About Poole Media — AI-Driven Marketing Agency",
    description:
      "Based in Tri-Cities, WA. We build fast websites, optimize for AI search, and automate email marketing so local businesses can compete with anyone.",
    type: "website",
    url: "https://poole.media/about",
  },
};

const VALUES = [
  {
    icon: Zap,
    title: "Performance First",
    description:
      "Sub-2-second load times aren't a nice-to-have — they're the baseline. Every site, every project, every time.",
  },
  {
    icon: Shield,
    title: "No Contracts",
    description:
      "We earn your business every month. If you're not seeing results, you can walk. No lock-ins, no hidden fees.",
  },
  {
    icon: BarChart3,
    title: "Results Over Deliverables",
    description:
      "We don't measure success by hours billed or pages delivered. We measure it by the growth your business sees.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-[#080810] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.12),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
            About
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-6 max-w-4xl">
            Built for the{" "}
            <span className="text-gradient">AI search era</span>
          </h1>
          <p className="text-xl text-white/55 leading-relaxed max-w-2xl">
            Poole Media is a digital marketing agency in Tri-Cities, WA. We help
            small and mid-sized businesses grow online in a world where AI is
            rewriting the rules of search.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
                Our Mission
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
                Local businesses deserve{" "}
                <span className="text-gradient">enterprise-grade</span>{" "}
                digital presence
              </h2>
              <p className="text-white/55 leading-relaxed mb-6">
                We founded Poole Media with a straightforward belief: a
                plumber in Kennewick, a dentist in Richland, or a contractor
                in Pasco should have the same quality of online presence as a
                Fortune 500 company. Without a Fortune 500 budget.
              </p>
              <p className="text-white/55 leading-relaxed">
                We exist to close that gap — building fast, AI-ready websites,
                ranking businesses across every search platform, and automating
                marketing so owners can focus on what they actually do.
              </p>
            </div>

            {/* Stat callouts */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "< 2s", label: "Average page load time" },
                { value: "4", label: "AI search platforms we optimize for" },
                { value: "0", label: "Contracts required" },
                { value: "100%", label: "Custom — no templates" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
                >
                  <p className="font-display text-4xl font-semibold text-gradient mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-white/50 leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why AI-First */}
      <section className="py-20 md:py-28 bg-[#060610]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
              Why AI-First
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              Search has changed. We changed with it.
            </h2>
            <p className="text-white/55 leading-relaxed text-lg">
              When someone asks ChatGPT &ldquo;who&apos;s the best plumber near
              me?&rdquo; or Perplexity &ldquo;best dentist in Kennewick WA&rdquo;
              — is your business in the answer? Most aren&apos;t. We fix that.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                engine: "ChatGPT",
                description:
                  "Hundreds of millions of users ask ChatGPT for local service recommendations every day. We make sure your business gets cited.",
              },
              {
                engine: "Perplexity",
                description:
                  "Perplexity indexes and cites the web in real time. We structure your content so it becomes the source Perplexity references.",
              },
              {
                engine: "Google AI Overview",
                description:
                  "Google's AI summaries now appear above traditional search results. Ranking here requires different tactics — we deliver them.",
              },
            ].map((item) => (
              <div
                key={item.engine}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
              >
                <p className="font-mono text-sm font-semibold text-[#6366f1] mb-3">
                  {item.engine}
                </p>
                <p className="text-sm text-white/55 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
            How We Work
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-14 max-w-xl">
            Our principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 mb-5">
                    <Icon className="h-5 w-5 text-[#6366f1]" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 md:py-20 bg-[#060610] border-t border-white/[0.05]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 mt-1">
                <MapPin className="h-5 w-5 text-[#6366f1]" />
              </div>
              <div>
                <p className="font-semibold text-white mb-1">
                  Tri-Cities, WA — Serving Nationwide
                </p>
                <p className="text-sm text-white/50">
                  Based in Kennewick, Richland &amp; Pasco. Working with
                  businesses across Washington and the country.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Work With Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
