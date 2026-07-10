import type { Metadata } from "next";
import Link from "next/link";
import {
  Globe,
  Search,
  Bot,
  Shield,
  Check,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { WaitlistForm } from "@/components/sections/WaitlistForm";
import { client } from "@/sanity/lib/client";
import {
  servicesPageQuery,
  comingSoonServiceQuery,
  type ServicesPageData,
  type ServicesPageService,
  type ComingSoonServiceData,
} from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Website Development, SEO & AI Content",
  description:
    "Custom Next.js websites, continuous agentic SEO, AI-assisted content, and site maintenance. No contracts. Built for the AI search era.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services — Website Development, Agentic SEO and AI Content | Poole Media",
    description:
      "Custom Next.js websites, continuous agentic SEO, AI-assisted content, and site maintenance. No contracts. Built for the AI search era.",
    type: "website",
    url: "https://poole.media/services",
  },
};

const ICONS: Record<ServicesPageService["id"], LucideIcon> = {
  website: Globe,
  "agentic-seo": Search,
  "ai-content": Bot,
  "site-maintenance": Shield,
};

const FALLBACK_SERVICES: ServicesPageService[] = [
  {
    id: "website",
    name: "Website Design and Build",
    price: "$1,500–$4,000",
    priceLabel: "One-time project fee",
    tagline: "Fast, modern, mobile-first websites built to convert.",
    description:
      "Custom Next.js site, mobile-first, sub-2-second load times, structured for AI search from day one. Includes on-page SEO setup, schema markup, and sitemap. No templates — clean code built to convert.",
    features: [
      "Sub-2-second load times guaranteed",
      "Mobile-first responsive design",
      "AI-search-ready architecture (GEO + AEO)",
      "Schema markup and structured data",
      "Custom design — no templates",
      "Built on Next.js + React",
      "Ongoing support available",
    ],
    ideal:
      "Local and regional businesses that need a site that actually brings in customers.",
  },
  {
    id: "agentic-seo",
    name: "Agentic SEO",
    price: "$500–$1,500/mo",
    priceLabel: "Monthly retainer",
    tagline: "Continuous SEO run by AI agents, reviewed by a human.",
    description:
      "Continuous technical SEO run by AI agents, reviewed by a senior strategist before anything ships. Keyword gap analysis, internal linking, on-page fixes, and AI-search optimization — delivered as a living system, not a quarterly report.",
    features: [
      "72-hour initial audit",
      "Technical SEO fixes applied monthly",
      "Keyword and competitor gap analysis",
      "Internal linking optimization",
      "AI search engine optimization (GEO + AEO)",
      "On-page content optimization",
      "Monthly ranking and traffic summary",
      "No lock-in contracts",
    ],
    ideal:
      "Businesses that want to rank on Google AND show up when customers ask ChatGPT, Perplexity, or Grok for recommendations.",
  },
  {
    id: "ai-content",
    name: "AI-Assisted Content",
    price: "$300–$800/mo",
    priceLabel: "Monthly retainer",
    tagline: "SEO-targeted content, drafted by AI, approved by you.",
    description:
      "2–4 SEO-optimized blog posts or landing pages per month. AI-drafted, human-reviewed, client-approved before publishing. Targets keywords surfaced by the Agentic SEO service — the two compound together.",
    features: [
      "2–4 pieces of content per month",
      "SEO-targeted topics based on keyword research",
      "AI-drafted, human-reviewed for accuracy and brand voice",
      "Client approval before publishing",
      "Internal linking to support SEO",
      "Consistent publishing cadence",
    ],
    ideal:
      "Businesses that know they need content but don't have the time or team to produce it consistently.",
  },
  {
    id: "site-maintenance",
    name: "Site Maintenance",
    price: "$100–$200/mo",
    priceLabel: "Monthly",
    tagline: "Your site stays fast, secure, and current.",
    description:
      "Hosting management, dependency updates, uptime monitoring, and minor copy edits. Low overhead for the client, high value for retention.",
    features: [
      "Hosting management",
      "Dependency and security updates",
      "Uptime monitoring",
      "Minor copy and image updates",
      "Priority support response",
    ],
    ideal: "Any client who wants their site managed without thinking about it.",
  },
];

const FALLBACK_COMING_SOON: ComingSoonServiceData = {
  sectionEyebrow: "Coming Soon",
  sectionHeadline: "What's next",
  sectionSubheadline:
    "More AI-powered tools for local businesses — in development now.",
  serviceName: "AI Review Management",
  descriptionParagraphs: [
    "Automatically respond to Google, Yelp, and Facebook reviews with context-aware replies that don't sound automated. Negative reviews trigger an alert to the business owner before anything posts.",
    "Includes a monthly competitor review intelligence report — the top pain points customers leave for your competitors, turned into a marketing brief.",
  ],
  waitlistPrompt: "Join the waitlist — be first to know when this launches.",
};

export default async function ServicesPage() {
  const [servicesData, comingSoonData] = await Promise.all([
    client.fetch<ServicesPageData | null>(servicesPageQuery).catch(() => null),
    client
      .fetch<ComingSoonServiceData | null>(comingSoonServiceQuery)
      .catch(() => null),
  ]);

  const pageHeadlinePlain =
    servicesData?.pageHeadlinePlain ?? "Everything you need to";
  const pageHeadlineHighlight =
    servicesData?.pageHeadlineHighlight ?? "grow online";
  const pageSubheadline =
    servicesData?.pageSubheadline ??
    "Four core services, all AI-first, all engineered to make your business impossible to ignore — on Google and in AI search.";
  const services = servicesData?.services?.length
    ? servicesData.services
    : FALLBACK_SERVICES;
  const comingSoon = comingSoonData ?? FALLBACK_COMING_SOON;

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
            {pageHeadlinePlain}{" "}
            <span className="text-gradient">{pageHeadlineHighlight}</span>
          </h1>
          <p className="text-xl text-white/55 leading-relaxed max-w-2xl mx-auto mb-10">
            {pageSubheadline}
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
          {services.map((service, index) => {
            const Icon = ICONS[service.id];
            const flip = index % 2 === 1;
            return (
              <div
                key={service.id}
                id={service.id}
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
                  <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white mb-3">
                    {service.tagline}
                  </h2>
                  <p className="text-sm font-medium text-[#6366f1] mb-4">
                    {service.price}{" "}
                    <span className="text-white/30 font-normal">
                      · {service.priceLabel}
                    </span>
                  </p>
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

      {/* Coming soon */}
      <section className="py-16 md:py-20 bg-[#0a0a0a] border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="inline-flex items-center rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">
              {comingSoon.sectionEyebrow}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white/50 mb-3">
              {comingSoon.sectionHeadline}
            </h2>
            <p className="text-white/30 leading-relaxed max-w-xl">
              {comingSoon.sectionSubheadline}
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* Service description */}
              <div>
                <h3 className="font-display text-2xl font-semibold text-white/50 mb-3">
                  {comingSoon.serviceName}
                </h3>
                {comingSoon.descriptionParagraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className={`text-white/30 leading-relaxed ${i < comingSoon.descriptionParagraphs.length - 1 ? "mb-4" : ""}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Waitlist */}
              <div>
                <p className="text-sm font-medium text-white/40 mb-4">
                  {comingSoon.waitlistPrompt}
                </p>
                <WaitlistForm serviceName={comingSoon.serviceName} />
              </div>
            </div>
          </div>
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
