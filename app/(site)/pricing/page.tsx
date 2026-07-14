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
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { JsonLd } from "@/components/shared/JsonLd";
import { client } from "@/sanity/lib/client";
import {
  servicesPageQuery,
  pricingQuery,
  type ServicesPageData,
  type ServicesPageService,
  type PricingData,
} from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Pricing — Transparent, No-Contract Plans",
  description:
    "Simple, transparent pricing for every stage of your digital presence. Custom websites, agentic SEO, AI content, and site maintenance — mix and match with no lock-in contracts.",
  keywords: [
    "digital marketing pricing",
    "SEO pricing",
    "website design pricing",
    "Tri-Cities WA",
    "no contracts",
    "agentic SEO cost",
    "AI content pricing",
  ],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Pricing — Transparent, No-Contract Plans | Poole Media",
    description:
      "Simple, transparent pricing for every stage of your digital presence. Mix and match services with no lock-in contracts.",
    type: "website",
    url: "https://poole.media/pricing",
  },
};

// Pricing-page-specific presentation for each of the four live services.
// Real name/price/priceLabel/description live on the servicesPage Sanity
// document (fetched below) — this map only holds fields that don't exist
// on that schema and are specific to this condensed overview page.
const PRICING_CARDS: Record<
  ServicesPageService["id"],
  {
    icon: LucideIcon;
    badge: string;
    price: string;
    priceLabel: string;
    description: string;
    includes: string[];
    ctaLabel: string;
  }
> = {
  website: {
    icon: Globe,
    badge: "One-time",
    price: "Custom quote",
    priceLabel: "Based on scope and complexity",
    description:
      "Custom Next.js site built for speed, AI search, and conversions. No templates — every build is bespoke.",
    includes: [
      "Sub-2-second load times",
      "Mobile-first design",
      "AI-search-ready architecture (GEO + AEO)",
      "Schema markup and structured data",
      "No templates — clean code only",
    ],
    ctaLabel: "Get a Quote",
  },
  "agentic-seo": {
    icon: Search,
    badge: "Monthly",
    price: "$400 – $750/mo",
    priceLabel: "No contracts · Cancel anytime",
    description:
      "Continuous technical SEO run by AI agents and reviewed by a human before anything ships. Two tiers based on your site platform.",
    includes: [
      "Monthly crawl and technical analysis",
      "GSC ranking and traffic data",
      "Keyword and competitor gap analysis",
      "AI search optimization (GEO + AEO)",
      "Monthly report to your inbox",
    ],
    ctaLabel: "Get Started",
  },
  "ai-content": {
    icon: Bot,
    badge: "Monthly",
    price: "$400/mo",
    priceLabel: "No contracts · Cancel anytime",
    description:
      "2–4 SEO-optimized pieces per month. AI-drafted, human-reviewed, client-approved. Works with any platform.",
    includes: [
      "2–4 pieces per month",
      "SEO-targeted topics from keyword research",
      "Human-reviewed for accuracy and brand voice",
      "Delivered to your CMS as a draft",
      "Works with any platform",
    ],
    ctaLabel: "Get Started",
  },
  "site-maintenance": {
    icon: Shield,
    badge: "Monthly",
    price: "$100 – $200/mo",
    priceLabel: "No contracts · Cancel anytime",
    description:
      "Hosting, updates, uptime monitoring, and minor edits. Your site stays fast and secure without you thinking about it.",
    includes: [
      "Hosting management",
      "Security and dependency updates",
      "Uptime monitoring",
      "Minor copy and image updates",
    ],
    ctaLabel: "Get Started",
  },
};

const FALLBACK_SERVICE_NAMES: Record<ServicesPageService["id"], string> = {
  website: "Website Design and Build",
  "agentic-seo": "Agentic SEO",
  "ai-content": "AI-Assisted Content",
  "site-maintenance": "Site Maintenance",
};

const FALLBACK_PRICING: PricingData = {
  pageHeadline: "Simple, transparent pricing.",
  pageSubheadline:
    "Every service is available individually or combined. No lock-in contracts — cancel anytime. Mix and match based on what your business actually needs.",
  bundlesHeadline: "Popular combinations",
  bundlesSubheadline:
    "These are the most common ways clients combine services. Everything is fully customizable — these are starting points, not packages.",
  bundles: [
    {
      bundleName: "Starter",
      tagline: "Get found without building a new site.",
      includes: ["Agentic SEO — Tier 1 (Monitoring + Intelligence)"],
      monthlyTotal: "$400/mo",
      note: "Works with your existing site on any platform.",
    },
    {
      bundleName: "Growth",
      tagline: "Rank faster with content that compounds.",
      includes: [
        "Agentic SEO — Tier 1 (Monitoring + Intelligence)",
        "AI-Assisted Content",
      ],
      monthlyTotal: "$800/mo",
      note: "Works with your existing site on any platform.",
    },
    {
      bundleName: "Full Stack",
      tagline: "A complete digital presence, built and managed for you.",
      includes: [
        "Website Design and Build (one-time — custom quote)",
        "Agentic SEO — Tier 2 (Monitoring + Implementation)",
        "Site Maintenance",
      ],
      monthlyTotal: "$950/mo + custom build fee",
      note: "Poole Media site required for Tier 2 SEO implementation.",
    },
    {
      bundleName: "Full Stack + Content",
      tagline: "Everything you need to dominate online.",
      includes: [
        "Website Design and Build (one-time — custom quote)",
        "Agentic SEO — Tier 2 (Monitoring + Implementation)",
        "AI-Assisted Content",
        "Site Maintenance",
      ],
      monthlyTotal: "$1,350/mo + custom build fee",
      note: "Poole Media site required for Tier 2 SEO implementation.",
    },
  ],
  faqHeadline: "Common pricing questions",
  faqs: [
    {
      question: "Are these prices fixed or negotiable?",
      answer:
        "The monthly service prices are fixed and transparent — what you see is what you pay. Website build fees are quoted per project based on scope and complexity. There are no hidden fees.",
    },
    {
      question: "Can I change or cancel my services?",
      answer:
        "Yes — all monthly services are no-contract. You can add, remove, or cancel any service with 30 days notice. No cancellation fees, no fine print.",
    },
    {
      question: "Do I need a Poole Media website to use the SEO or content services?",
      answer:
        "No. Agentic SEO Tier 1 and AI-Assisted Content work with any website on any platform. Agentic SEO Tier 2 (automated fix execution) is only available for sites built on the Poole Media stack.",
    },
    {
      question: "What's the difference between the two Agentic SEO tiers?",
      answer:
        "Both tiers include the full analysis — monthly crawl, GSC data, keyword gaps, competitor intelligence, AI search optimization, and a monthly report. Tier 2 adds automated fix execution: our agent applies approved technical fixes directly to your site each month. This is only possible on sites we built and manage via our pipeline.",
    },
    {
      question: "How does the website build fee work with a bundle?",
      answer:
        "The build fee is a one-time project cost quoted based on your site's scope and complexity. It's separate from the monthly retainer. You pay the build fee once, then the monthly bundle price starts when your site launches.",
    },
  ],
  bottomCtaHeadline: "Not sure where to start?",
  bottomCtaBody:
    "Book a free 30-minute audit. We'll review your current digital presence, identify your biggest growth opportunity, and recommend the right combination of services for your goals — no commitment required.",
};

export default async function PricingPage() {
  const [servicesData, pricingData] = await Promise.all([
    client.fetch<ServicesPageData | null>(servicesPageQuery).catch(() => null),
    client.fetch<PricingData | null>(pricingQuery).catch(() => null),
  ]);

  const serviceNames: Record<ServicesPageService["id"], string> = {
    ...FALLBACK_SERVICE_NAMES,
    ...Object.fromEntries(
      (servicesData?.services ?? []).map((s) => [s.id, s.name])
    ),
  };

  const pageHeadline = pricingData?.pageHeadline ?? FALLBACK_PRICING.pageHeadline;
  const pageSubheadline =
    pricingData?.pageSubheadline ?? FALLBACK_PRICING.pageSubheadline;
  const bundlesHeadline =
    pricingData?.bundlesHeadline ?? FALLBACK_PRICING.bundlesHeadline;
  const bundlesSubheadline =
    pricingData?.bundlesSubheadline ?? FALLBACK_PRICING.bundlesSubheadline;
  const bundles = pricingData?.bundles?.length
    ? pricingData.bundles
    : FALLBACK_PRICING.bundles;
  const faqHeadline = pricingData?.faqHeadline ?? FALLBACK_PRICING.faqHeadline;
  const faqs = pricingData?.faqs?.length ? pricingData.faqs : FALLBACK_PRICING.faqs;
  const bottomCtaHeadline =
    pricingData?.bottomCtaHeadline ?? FALLBACK_PRICING.bottomCtaHeadline;
  const bottomCtaBody =
    pricingData?.bottomCtaBody ?? FALLBACK_PRICING.bottomCtaBody;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main>
      <JsonLd data={faqSchema} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-[#080810] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.12),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
            Pricing
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-6">
            {pageHeadline}
          </h1>
          <p className="text-xl text-white/55 leading-relaxed max-w-2xl mx-auto">
            {pageSubheadline}
          </p>
        </div>
      </section>

      {/* Individual services */}
      <section className="py-20 md:py-28 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
              Individual Services
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-5">
              Start with what you need
            </h2>
            <p className="text-lg text-white/50 leading-relaxed">
              Every service works on its own. Add more when you&apos;re ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {(
              Object.keys(PRICING_CARDS) as ServicesPageService["id"][]
            ).map((id) => {
              const card = PRICING_CARDS[id];
              const Icon = card.icon;
              return (
                <div
                  key={id}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20">
                      <Icon className="h-5 w-5 text-[#6366f1]" />
                    </div>
                    <span className="inline-flex items-center rounded-full border border-white/[0.1] bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/40">
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1 tracking-tight">
                    {serviceNames[id]}
                  </h3>
                  <p className="text-sm font-medium text-[#6366f1] mb-1">
                    {card.price}
                  </p>
                  <p className="text-xs text-white/30 mb-4">{card.priceLabel}</p>
                  <p className="text-sm text-white/55 leading-relaxed mb-5">
                    {card.description}
                  </p>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {card.includes.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className="h-3.5 w-3.5 text-[#6366f1] mt-0.5 shrink-0" />
                        <span className="text-xs text-white/60">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white/80 hover:text-white hover:border-white/25 transition-all duration-200"
                  >
                    {card.ctaLabel}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Example bundles */}
      <section id="bundles" className="py-20 md:py-28 bg-[#060610] border-t border-white/[0.05]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
              Example Bundles
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-5">
              {bundlesHeadline}
            </h2>
            <p className="text-lg text-white/50 leading-relaxed">
              {bundlesSubheadline}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bundles.map((bundle) => {
              const ctaLabel = bundle.monthlyTotal.includes("custom build fee")
                ? "Get a Quote"
                : "Get Started";
              return (
                <div
                  key={bundle.bundleName}
                  className="rounded-2xl border border-[#6366f1]/25 bg-gradient-to-b from-[#6366f1]/[0.07] to-transparent p-7 md:p-8 flex flex-col h-full"
                >
                  <h3 className="font-display text-2xl font-semibold text-white mb-2">
                    {bundle.bundleName}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-6">
                    {bundle.tagline}
                  </p>
                  <ul className="space-y-3 mb-6 flex-1">
                    {bundle.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-[#6366f1] mt-0.5 shrink-0" />
                        <span className="text-sm text-white/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-6 border-t border-white/[0.08]">
                    <p className="font-display text-3xl font-semibold text-gradient mb-1">
                      {bundle.monthlyTotal}
                    </p>
                    <p className="text-xs text-white/40 mb-6">{bundle.note}</p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                    >
                      {ctaLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-[#0a0a0a]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white mb-10 text-center">
            {faqHeadline}
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-[#060610] border-t border-white/[0.05]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-5">
            {bottomCtaHeadline}
          </h2>
          <p className="text-white/55 leading-relaxed mb-8 text-lg">
            {bottomCtaBody}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-8 py-4 text-base font-semibold text-white shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Book Free Audit
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.04] px-8 py-4 text-base font-semibold text-white/80 hover:text-white hover:border-white/25 transition-all duration-200"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
