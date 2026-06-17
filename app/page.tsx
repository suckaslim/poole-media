import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { Hero } from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: "Poole Media — AI-Driven Digital Marketing | Tri-Cities, WA",
  description:
    "We build sub-2-second websites, optimize for AI search (ChatGPT, Perplexity, Grok & Google), and automate email marketing for small businesses in Tri-Cities, WA and beyond.",
  openGraph: {
    title: "Poole Media — AI-Driven Digital Marketing | Tri-Cities, WA",
    description:
      "Sub-2-second websites, AI search optimization, and automated email marketing. Get found everywhere your customers are searching.",
    type: "website",
    url: "https://poole.media",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Poole Media",
  description:
    "AI-driven digital marketing agency in Tri-Cities, WA specializing in website development, AI-Ready SEO, and email marketing.",
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
    "Website Development",
    "AI-Ready SEO",
    "Email Marketing",
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

export default function HomePage() {
  return (
    <main>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={webSiteSchema} />
      <Hero />
      <SocialProof />
      <Services />
      <WhyPooleMedia />
      <HowItWorks />
      <CaseStudiesPreview />
      <Testimonials />
      <FaqPreview />
      <CtaBanner />
    </main>
  );
}
