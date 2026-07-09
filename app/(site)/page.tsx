import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { client } from "@/sanity/lib/client";
import { homepageQuery, type HomepageData } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Poole Media | Agentic SEO & Web Design, Tri-Cities WA",
  description:
    "We build custom websites and run continuous agentic SEO — so your business shows up on Google, ChatGPT, Perplexity, and Grok. Serving Tri-Cities, WA and beyond.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Poole Media | Agentic SEO & Web Design, Tri-Cities WA",
    description:
      "Custom websites and continuous agentic SEO. Get found on Google, ChatGPT, Perplexity, and Grok.",
    type: "website",
    url: "https://poole.media",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Poole Media",
  description:
    "AI-driven digital marketing agency in Tri-Cities, WA specializing in website development, agentic SEO, AI-assisted content, and site maintenance.",
  url: "https://poole.media",
  email: "contact@poole.media",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kennewick",
    addressRegion: "WA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Kennewick" },
    { "@type": "City", name: "Richland" },
    { "@type": "City", name: "Pasco" },
    { "@type": "State", name: "Washington" },
  ],
  serviceType: [
    "Website Design and Build",
    "Agentic SEO",
    "AI-Assisted Content",
    "Site Maintenance",
    "Digital Marketing",
  ],
  priceRange: "$$",
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Poole Media",
  url: "https://poole.media",
};
import { SocialProof } from "@/components/sections/SocialProof";
import { Services } from "@/components/sections/Services";
import { WhyPooleMedia } from "@/components/sections/WhyPooleMedia";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CaseStudiesPreview } from "@/components/sections/CaseStudiesPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqPreview } from "@/components/sections/FaqPreview";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default async function HomePage() {
  const data = await client
    .fetch<HomepageData | null>(homepageQuery)
    .catch(() => null);

  const heroHeadlineLine1 = data?.heroHeadlineLine1 ?? "Get Found in AI Search.";
  const heroHeadlineLine2 = data?.heroHeadlineLine2 ?? "Get More Customers.";
  const heroSubheadline =
    data?.heroSubheadline ??
    "We build sub-2-second websites and run continuous agentic SEO — so your business gets found on Google, ChatGPT, Perplexity, and Grok.";
  const heroCtaPrimary = data?.heroCtaPrimary ?? "Get Free Audit";
  const heroCtaSecondary = data?.heroCtaSecondary ?? "See Our Work";
  const statsItems = data?.statsItems?.length
    ? data.statsItems
    : [
        { value: "< 2s", label: "Page Load Times" },
        { value: "AI-Ready", label: "ChatGPT · Perplexity · Grok · Google" },
        { value: "No Contracts", label: "Cancel Anytime" },
        { value: "Mobile-First", label: "Every Build, By Default" },
        { value: "Tri-Cities, WA", label: "Serving Businesses Nationwide" },
      ];
  const whatWeDoHeadlinePlain =
    data?.whatWeDoHeadlinePlain ?? "Everything you need to";
  const whatWeDoHeadlineHighlight =
    data?.whatWeDoHeadlineHighlight ?? "dominate online";
  const whatWeDoSubheadline =
    data?.whatWeDoSubheadline ??
    "From your first website to ongoing AI search dominance — we handle the digital presence so you can focus on running your business.";

  return (
    <main>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={webSiteSchema} />
      <Hero
        headlineLine1={heroHeadlineLine1}
        headlineLine2={heroHeadlineLine2}
        subheadline={heroSubheadline}
        ctaPrimary={heroCtaPrimary}
        ctaSecondary={heroCtaSecondary}
      />
      <SocialProof items={statsItems} />
      <Services
        headlinePlain={whatWeDoHeadlinePlain}
        headlineHighlight={whatWeDoHeadlineHighlight}
        subheadline={whatWeDoSubheadline}
      />
      <WhyPooleMedia />
      <HowItWorks />
      <CaseStudiesPreview />
      <Testimonials />
      <FaqPreview />
      <CtaBanner />
    </main>
  );
}
