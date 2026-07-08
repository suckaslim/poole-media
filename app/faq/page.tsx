import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { JsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description:
    "Answers to common questions about Poole Media's services, packages, contracts, and how to get started with AI-driven digital marketing.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ — Frequently Asked Questions | Poole Media",
    description:
      "Common questions about our services, pricing, and how to get started — all answered.",
    type: "website",
    url: "https://poole.media/faq",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services do you offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer four core services: Website Design and Build, Agentic SEO, AI-Assisted Content, and Site Maintenance. Everything is built for the AI search era — so your business gets found on Google, ChatGPT, Perplexity, and Grok.",
      },
    },
    {
      "@type": "Question",
      name: "What is agentic SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agentic SEO is continuous search optimization run by AI agents and reviewed by a human strategist before anything ships. Instead of a quarterly report, you get monthly fixes, keyword updates, and ranking improvements delivered as an ongoing system. We optimize for both traditional Google rankings and AI search platforms like ChatGPT, Perplexity, and Grok.",
      },
    },
    {
      "@type": "Question",
      name: "Do you have service packages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer tailored packages to fit different budgets and goals. Whether you need just a website refresh, a full SEO strategy, or an end-to-end digital presence overhaul, we have an option that fits.",
      },
    },
    {
      "@type": "Question",
      name: "What company sizes do you serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We work with startups, small businesses, and mid-sized companies across various industries. If you're a local business in the Tri-Cities area or anywhere nationwide looking to grow your online presence, we're a great fit.",
      },
    },
    {
      "@type": "Question",
      name: "How long are contracts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We don't have contracts! If you aren't happy with our services you are free to cancel at any time. We believe in earning your business every month through results, not locking you in through paperwork.",
      },
    },
    {
      "@type": "Question",
      name: "Can I customize my package?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. While AI-Readiness is at the heart of everything we do, we can customize a package for your specific needs. Schedule a free consultation and we'll build a tailored roadmap around your goals.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get started?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Schedule a free consultation with us. We'll review your current digital presence, discuss your business goals, and build a custom action plan — no commitment required.",
      },
    },
  ],
};

export default function FaqPage() {
  return (
    <main>
      <JsonLd data={faqSchema} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-[#080810] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.12),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
            FAQ
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight text-white mb-5">
            Frequently asked{" "}
            <span className="text-gradient">questions</span>
          </h1>
          <p className="text-xl text-white/55 leading-relaxed max-w-xl">
            Everything you need to know about working with Poole Media. Still
            have questions?{" "}
            <Link
              href="/contact"
              className="text-[#8b5cf6] hover:text-white transition-colors duration-200"
            >
              Just ask us.
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FaqAccordion />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#060610] border-t border-white/[0.05]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-white/55 leading-relaxed mb-8">
            We&apos;re happy to answer anything on a free 30-minute discovery
            call. No pitch, just answers.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Schedule a Free Call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
