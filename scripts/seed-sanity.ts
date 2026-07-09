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
        price: "$500–$1,500/mo",
        priceLabel: "Monthly retainer",
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
        _type: "service",
        _key: "ai-content",
        id: "ai-content",
        name: "AI-Assisted Content",
        tagline: "SEO-targeted content, drafted by AI, approved by you.",
        price: "$300–$800/mo",
        priceLabel: "Monthly retainer",
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
}

seed()
  .then(() => console.log("Done."))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
