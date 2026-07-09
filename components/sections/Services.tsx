import { Globe, Search, Bot, Shield } from "lucide-react";
import { ServiceCard } from "@/components/shared/ServiceCard";

const SERVICES = [
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Website Design and Build",
    description:
      "Custom Next.js sites, mobile-first, sub-2-second load times, structured for AI search from day one. No templates — clean code built to convert.",
    href: "/services#website",
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "Agentic SEO",
    description:
      "Continuous technical SEO run by AI agents, reviewed by a human before anything ships. Rank on Google AND show up when customers ask ChatGPT or Perplexity.",
    href: "/services#agentic-seo",
  },
  {
    icon: <Bot className="h-6 w-6" />,
    title: "AI-Assisted Content",
    description:
      "2–4 SEO-optimized blog posts or landing pages per month. AI-drafted, human-reviewed, client-approved. Compounds with Agentic SEO for faster rankings.",
    href: "/services#ai-content",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Site Maintenance",
    description:
      "Hosting management, dependency updates, uptime monitoring, and minor copy edits. Your site stays fast, secure, and current — without you thinking about it.",
    href: "/services#site-maintenance",
  },
];

export function Services({
  headlinePlain,
  headlineHighlight,
  subheadline,
}: {
  headlinePlain: string;
  headlineHighlight: string;
  subheadline: string;
}) {
  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
            What We Do
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-5">
            {headlinePlain} <span className="text-gradient">{headlineHighlight}</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            {subheadline}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
