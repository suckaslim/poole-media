// Seeds Sanity with the content that's currently hardcoded in the site's
// components, so Studio shows real copy instead of empty fields.
//
// Run with: npm run seed:sanity
// (uses `sanity exec`, which loads .env.local automatically)
//
// Idempotent: uses createOrReplace with fixed document IDs, so re-running
// this after editing content in Studio will overwrite those edits back to
// the values below — only run it intentionally.
//
// Deliberately does NOT seed any `caseStudy` documents: the old Supabase
// case_studies table is empty, so there's no real client content to carry
// over, and inventing placeholder results would violate the "no fake
// client data" rule this project follows. Create case studies in Studio.
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_API_TOKEN in .env.local."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

async function seed() {
  await client.createOrReplace({
    _id: "homepage",
    _type: "homepage",
    heroHeadlineLine1: "Get Found in AI Search.",
    heroHeadlineLine2: "Get More Customers.",
    heroSubheadline:
      "We build sub-2-second websites and run continuous agentic SEO — so your business gets found on Google, ChatGPT, Perplexity, and Grok.",
    heroCtaPrimary: "Get Free Audit",
    heroCtaSecondary: "See Our Work",
    statsItems: [
      { _type: "statItem", _key: "load-time", value: "< 2s", label: "Page Load Times" },
      { _type: "statItem", _key: "ai-ready", value: "AI-Ready", label: "ChatGPT · Perplexity · Grok · Google" },
      { _type: "statItem", _key: "no-contracts", value: "No Contracts", label: "Cancel Anytime" },
      { _type: "statItem", _key: "mobile-first", value: "Mobile-First", label: "Every Build, By Default" },
      { _type: "statItem", _key: "tri-cities", value: "Tri-Cities, WA", label: "Serving Businesses Nationwide" },
    ],
    whatWeDoHeadlinePlain: "Everything you need to",
    whatWeDoHeadlineHighlight: "dominate online",
    whatWeDoSubheadline:
      "From your first website to ongoing AI search dominance — we handle the digital presence so you can focus on running your business.",
  });
  console.log("Seeded homepage");

  await client.createOrReplace({
    _id: "servicesPage",
    _type: "servicesPage",
    pageHeadlinePlain: "Everything you need to",
    pageHeadlineHighlight: "grow online",
    pageSubheadline:
      "Four core services, all AI-first, all engineered to make your business impossible to ignore — on Google and in AI search.",
    services: [
      {
        _type: "service",
        _key: "website",
        id: "website",
        name: "Website Design and Build",
        tagline: "Fast, modern, mobile-first websites built to convert.",
        price: "$1,500–$4,000",
        priceLabel: "One-time project fee",
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
        _type: "service",
        _key: "agentic-seo",
        id: "agentic-seo",
        name: "Agentic SEO",
        tagline: "Continuous SEO run by AI agents, reviewed by a human.",
        price: "$400–$750/mo",
        priceLabel: "Monthly retainer · No contracts",
        description:
          "Continuous technical SEO run by AI agents, reviewed by a human strategist before anything ships. Keyword gap analysis, internal linking, on-page fixes, and AI-search optimization — delivered as a living system every month, not a quarterly report.",
        tiers: [
          {
            _type: "tier",
            _key: "tier-1",
            tierName: "Tier 1 — Monitoring + Intelligence",
            tierPrice: "$400/mo",
            tierDescription:
              "Works with any website on any platform. Monthly crawl, GSC data pull, AI analysis, keyword gap report, competitor intelligence, and full report delivered to your inbox. Recommendations for you or your developer to implement.",
          },
          {
            _type: "tier",
            _key: "tier-2",
            tierName: "Tier 2 — Monitoring + Intelligence + Implementation",
            tierPrice: "$750/mo",
            tierDescription:
              "Everything in Tier 1, plus fixes applied directly to your site each month via our automated pipeline. Available exclusively for sites built on the Poole Media stack.",
          },
        ],
        features: [
          "72-hour initial audit",
          "Monthly site crawl and technical analysis",
          "GSC ranking and traffic data",
          "Keyword and competitor gap analysis",
          "AI search optimization (GEO + AEO)",
          "On-page content optimization",
          "Internal linking improvements",
          "Monthly report delivered to your inbox",
          "Automated fix execution (Tier 2 / Poole Media sites only)",
          "No lock-in contracts",
        ],
        ideal:
          "Businesses that want to rank on Google AND show up when customers ask ChatGPT, Perplexity, or Grok for recommendations in their area.",
      },
      {
        _type: "service",
        _key: "ai-content",
        id: "ai-content",
        name: "AI-Assisted Content",
        tagline: "SEO-targeted content, drafted by AI, approved by you.",
        price: "$400/mo",
        priceLabel: "Monthly · No contracts",
        description:
          "2–4 SEO-optimized blog posts or landing pages per month. AI-drafted, human-reviewed for accuracy and brand voice, client-approved before anything publishes. Works with any platform — Next.js, WordPress, Webflow, or whatever you're already on. Pairs with Agentic SEO for compounding results, or works as a standalone service if you already have a site you're happy with.",
        platformNote: "Works with any platform",
        features: [
          "2–4 SEO-targeted pieces per month",
          "Topics based on real keyword research",
          "AI-drafted, human-reviewed for accuracy and brand voice",
          "Client approval before anything publishes",
          "Delivered directly to your CMS as a draft (any platform)",
          "Works with Next.js, WordPress, Webflow, and more",
          "Internal linking to support SEO",
          "Consistent monthly publishing cadence",
          "Available as standalone or paired with Agentic SEO",
        ],
        ideal:
          "Businesses that know they need consistent content but don't have the time or team to produce it — whether or not they're on a Poole Media site.",
      },
      {
        _type: "service",
        _key: "site-maintenance",
        id: "site-maintenance",
        name: "Site Maintenance",
        tagline: "Your site stays fast, secure, and current.",
        price: "$100–$200/mo",
        priceLabel: "Monthly",
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
    ],
  });
  console.log("Seeded servicesPage");

  await client.createOrReplace({
    _id: "comingSoonService",
    _type: "comingSoonService",
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
  });
  console.log("Seeded comingSoonService");

  await client.createOrReplace({
    _id: "navigation",
    _type: "navigation",
    footerDescription:
      "AI-driven digital marketing for businesses that want to be found.",
    footerCopyright: "© {year} Poole Media. All rights reserved.",
  });
  console.log("Seeded navigation");

  await client.createOrReplace({
    _id: "pricing",
    _type: "pricing",
    pageHeadline: "Simple, transparent pricing.",
    pageSubheadline:
      "Every service is available individually or combined. No lock-in contracts — cancel anytime. Mix and match based on what your business actually needs.",
    bundlesHeadline: "Popular combinations",
    bundlesSubheadline:
      "These are the most common ways clients combine services. Everything is fully customizable — these are starting points, not packages.",
    bundles: [
      {
        _type: "bundle",
        _key: "starter",
        bundleName: "Starter",
        tagline: "Get found without building a new site.",
        includes: ["Agentic SEO — Tier 1 (Monitoring + Intelligence)"],
        monthlyTotal: "$400/mo",
        note: "Works with your existing site on any platform.",
      },
      {
        _type: "bundle",
        _key: "growth",
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
        _type: "bundle",
        _key: "full-stack",
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
        _type: "bundle",
        _key: "full-stack-content",
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
        _type: "faq",
        _key: "fixed-or-negotiable",
        question: "Are these prices fixed or negotiable?",
        answer:
          "The monthly service prices are fixed and transparent — what you see is what you pay. Website build fees are quoted per project based on scope and complexity. There are no hidden fees.",
      },
      {
        _type: "faq",
        _key: "change-or-cancel",
        question: "Can I change or cancel my services?",
        answer:
          "Yes — all monthly services are no-contract. You can add, remove, or cancel any service with 30 days notice. No cancellation fees, no fine print.",
      },
      {
        _type: "faq",
        _key: "need-poole-site",
        question:
          "Do I need a Poole Media website to use the SEO or content services?",
        answer:
          "No. Agentic SEO Tier 1 and AI-Assisted Content work with any website on any platform. Agentic SEO Tier 2 (automated fix execution) is only available for sites built on the Poole Media stack.",
      },
      {
        _type: "faq",
        _key: "tier-difference",
        question: "What's the difference between the two Agentic SEO tiers?",
        answer:
          "Both tiers include the full analysis — monthly crawl, GSC data, keyword gaps, competitor intelligence, AI search optimization, and a monthly report. Tier 2 adds automated fix execution: our agent applies approved technical fixes directly to your site each month. This is only possible on sites we built and manage via our pipeline.",
      },
      {
        _type: "faq",
        _key: "build-fee-with-bundle",
        question: "How does the website build fee work with a bundle?",
        answer:
          "The build fee is a one-time project cost quoted based on your site's scope and complexity. It's separate from the monthly retainer. You pay the build fee once, then the monthly bundle price starts when your site launches.",
      },
    ],
    bottomCtaHeadline: "Not sure where to start?",
    bottomCtaBody:
      "Book a free 30-minute audit. We'll review your current digital presence, identify your biggest growth opportunity, and recommend the right combination of services for your goals — no commitment required.",
  });
  console.log("Seeded pricing");

  await client.createOrReplace({
    _id: "auditPage",
    _type: "auditPage",
    label: "Free SEO Audit",
    headline: "See how your site scores in 30 seconds.",
    subheadline:
      "Enter any URL below and our agent will crawl your homepage and surface the most common SEO issues holding your site back. Free, instant, no sign-up required.",
    postResultsCtaHeadline: "This was a homepage-only audit.",
    postResultsCtaBody:
      "Want us to crawl your entire site, analyze keyword gaps, check your competitors, and deliver a full report within 72 hours?",
  });
  console.log("Seeded auditPage");
}

seed()
  .then(() => console.log("Done."))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
