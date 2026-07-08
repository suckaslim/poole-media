import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { Hero } from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: "Poole Media | Agentic SEO & Web Design, Tri-Cities WA",
  description:
    "We build custom websites and run continuous agentic SEO — so your business shows up on Google, ChatGPT, Perplexity, and Grok. Serving Tri-Cities, WA and beyond.",
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
