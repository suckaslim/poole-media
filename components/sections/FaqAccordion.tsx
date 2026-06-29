"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "What services do you offer?",
    answer:
      "We offer four core services: Website Design and Build, Agentic SEO, AI-Assisted Content, and Site Maintenance. Everything is built for the AI search era — so your business gets found on Google, ChatGPT, Perplexity, and Grok.",
  },
  {
    question: "What is agentic SEO?",
    answer:
      "Agentic SEO is continuous search optimization run by AI agents and reviewed by a human strategist before anything ships. Instead of a quarterly report, you get monthly fixes, keyword updates, and ranking improvements delivered as an ongoing system. We optimize for both traditional Google rankings and AI search platforms like ChatGPT, Perplexity, and Grok.",
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

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
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
  );
}
