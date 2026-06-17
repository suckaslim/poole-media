import { Globe, Search, Mail } from "lucide-react";
import { ServiceCard } from "@/components/shared/ServiceCard";

const SERVICES = [
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Website Development",
    description:
      "Fast, modern, mobile-first sites that load in under 2 seconds and turn visitors into paying customers. No bloated templates — clean design focused on results.",
    href: "/services#web-development",
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "AI-Ready SEO",
    description:
      "Optimize for the new AI search world (ChatGPT, Perplexity, Grok) while crushing traditional Google rankings. Perfect for local businesses trying to stand out.",
    href: "/services#ai-seo",
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email Marketing",
    description:
      "Automated email sequences that nurture leads, win back old customers, and drive consistent bookings or sales on autopilot.",
    href: "/services#email-marketing",
  },
];

export function Services() {
  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
            What We Do
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-5">
            Everything you need to{" "}
            <span className="text-gradient">dominate online</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            From your first website to ongoing AI search dominance — we handle
            the digital presence so you can focus on running your business.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
