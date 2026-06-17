"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "What services do you offer?",
    answer:
      "We provide digital marketing including AI-Ready SEO, website development, and email campaigns — all engineered to make your business visible across the new landscape of AI-powered search.",
  },
  {
    question: "How long are contracts?",
    answer:
      "We don't have contracts! If you aren't happy with our services you are free to cancel at any time. We believe in earning your business every month, not locking you in.",
  },
  {
    question: "What company sizes do you serve?",
    answer:
      "We work with startups, small businesses, and mid-sized companies across various industries. If you're a local business in Tri-Cities, WA or anywhere nationwide looking to grow online, we're a good fit.",
  },
  {
    question: "How do I get started?",
    answer:
      "Schedule a free consultation with us. We'll review your current digital presence, discuss your goals, and build a custom roadmap — no commitment required.",
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
        <span className="text-base font-medium text-white/90">{question}</span>
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
            <p className="pb-5 text-sm text-white/50 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-24 md:py-32 bg-[#060610]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Header */}
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
              FAQ
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              Common{" "}
              <span className="text-gradient">questions</span>
            </h2>
            <p className="text-lg text-white/50 leading-relaxed mb-8">
              Have more questions? We&apos;re happy to answer anything on a free
              discovery call.
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#8b5cf6] hover:text-white transition-colors duration-200"
            >
              View all FAQs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right: Accordion */}
          <div>
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
      </div>
    </section>
  );
}
