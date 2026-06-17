"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "What services do you offer?",
    answer:
      "We provide digital marketing including AI-Ready SEO, website development, and email campaigns — all engineered to make your business visible across the new landscape of AI-powered search and traditional search engines.",
  },
  {
    question: "Do you have service packages?",
    answer:
      "Yes, we offer tailored packages to fit different budgets and goals. Whether you need just a website refresh, a full SEO strategy, or an end-to-end digital presence overhaul, we have an option that fits.",
  },
  {
    question: "What company sizes do you serve?",
    answer:
      "We work with startups, small businesses, and mid-sized companies across various industries. If you're a local business in the Tri-Cities area or anywhere nationwide looking to grow your online presence, we're a great fit.",
  },
  {
    question: "How long are contracts?",
    answer:
      "We don't have contracts! If you aren't happy with our services you are free to cancel at any time. We believe in earning your business every month through results, not locking you in through paperwork.",
  },
  {
    question: "Can I customize my package?",
    answer:
      "Absolutely. While AI-Readiness is at the heart of everything we do, we can customize a package for your specific needs. Schedule a free consultation and we'll build a tailored roadmap around your goals.",
  },
  {
    question: "How do I get started?",
    answer:
      "Schedule a free consultation with us. We'll review your current digital presence, discuss your business goals, and build a custom action plan — no commitment required. You can reach us through the contact form below.",
  },
];

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/[0.08]">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-base md:text-lg font-medium text-white/90">
          {question}
        </span>
        <span className="shrink-0 rounded-full border border-white/[0.1] p-1 text-white/50">
          {isOpen ? (
            <Minus className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base text-white/50 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <main>
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

      {/* FAQ list */}
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-white/[0.08]">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem
                key={i}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions CTA */}
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
