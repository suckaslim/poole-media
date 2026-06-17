import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Search, Mail, Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Services — Website Dev, AI SEO & Email Marketing",
  description:
    "Explore Poole Media's three core services: custom website development, AI-Ready SEO for ChatGPT, Perplexity & Google, and automated email marketing that converts.",
  openGraph: {
    title: "Services — Website Dev, AI SEO & Email Marketing",
    description:
      "Custom websites that load in under 2 seconds, AI search optimization, and automated email campaigns for local businesses.",
    type: "website",
    url: "https://poole.media/services",
  },
};

const SERVICES = [
  {
    icon: Globe,
    name: "Website Development",
    tagline: "Fast, modern, mobile-first websites built to convert.",
    description:
      "We build custom websites that load in under 2 seconds, look stunning on every device, and are architected from the ground up for search engines — including AI-powered ones. No bloated page builders. No templates that look like everyone else's. Clean code, purposeful design, and results-focused execution.",
    features: [
      "Sub-2-second load times, guaranteed",
      "Mobile-first responsive design",
      "SEO-ready architecture from day one",
      "Custom design — no templates",
      "Performance-optimized images and code",
      "Built on modern frameworks (Next.js + React)",
      "Structured data & schema markup",
      "Ongoing support available",
    ],
    ideal:
      "Small businesses, service providers, and local brands that want a site that actually brings in customers.",
  },
  {
    icon: Search,
    name: "AI-Ready SEO",
    tagline: "Get found across every search engine — AI and traditional.",
    description:
      "Search has fundamentally changed. ChatGPT, Perplexity, and Grok now answer questions that used to send traffic directly to your website. We optimize for both the new AI search engines and traditional Google rankings, so wherever your customers are searching, they find you first.",
    features: [
      "AI search engine optimization (ChatGPT, Perplexity, Grok)",
      "Traditional Google & Bing ranking strategy",
      "Local SEO for your service area",
      "Content that AI systems cite and recommend",
      "Schema markup and structured data",
      "Monthly performance reporting",
      "Keyword and competitor analysis",
      "Backlink strategy and outreach",
    ],
    ideal:
      "Local businesses trying to stand out in an increasingly AI-mediated search landscape.",
  },
  {
    icon: Mail,
    name: "Email Marketing",
    tagline: "Automated campaigns that fill your calendar on autopilot.",
    description:
      "Email remains the highest ROI marketing channel — when it's done right. We design and build automated email sequences that welcome new leads, nurture prospects over time, win back old customers, and drive consistent bookings or sales without you lifting a finger.",
    features: [
      "Automated welcome and nurture sequences",
      "Win-back campaigns for lapsed customers",
      "Promotional campaign design and copy",
      "List segmentation and personalization",
      "A/B testing for subject lines and content",
      "Performance tracking and optimization",
      "CRM integration setup",
      "Monthly campaign execution",
    ],
    ideal:
      "Businesses with an email list they're underutilizing, or anyone who wants leads nurtured automatically.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-[#080810] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.12),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
            Services
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-6">
            Everything you need to{" "}
            <span className="text-gradient">grow online</span>
          </h1>
          <p className="text-xl text-white/55 leading-relaxed max-w-2xl mx-auto mb-10">
            Three core services, all AI-first, all engineered to make your
            business impossible to ignore — online and in AI search.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Get a Free Audit
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Services detail */}
      <section className="py-20 md:py-28 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            const flip = index % 2 === 1;
            return (
              <div
                key={service.name}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start ${flip ? "lg:grid-flow-dense" : ""}`}
              >
                {/* Text */}
                <div className={flip ? "lg:col-start-2" : ""}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20">
                      <Icon className="h-5 w-5 text-[#6366f1]" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6]">
                      {service.name}
                    </span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
                    {service.tagline}
                  </h2>
                  <p className="text-white/55 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <p className="text-sm mb-8">
                    <span className="text-white/60 font-medium">
                      Best for:{" "}
                    </span>
                    <span className="text-white/40 italic">{service.ideal}</span>
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white/80 hover:text-white hover:border-white/25 transition-all duration-200"
                  >
                    Get started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Features card */}
                <div className={flip ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7">
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">
                      What&apos;s Included
                    </p>
                    <ul className="space-y-3.5">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="h-4 w-4 text-[#6366f1] mt-0.5 shrink-0" />
                          <span className="text-sm text-white/70">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#060610] border-t border-white/[0.05]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-5">
            Not sure which service you need?
          </h2>
          <p className="text-white/55 leading-relaxed mb-8 text-lg">
            Book a free 30-minute audit. We&apos;ll review your current digital
            presence and tell you exactly where your biggest growth opportunity
            is — no commitment required.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-8 py-4 text-base font-semibold text-white shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Book Free Audit
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
