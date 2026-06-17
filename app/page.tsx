import { Hero } from "@/components/sections/Hero";
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
