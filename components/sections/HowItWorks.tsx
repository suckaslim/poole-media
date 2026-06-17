"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEPS = [
  {
    number: "01",
    title: "Discovery & Free Audit",
    description:
      "15–30 minute call to review your current digital presence, understand your goals, and identify the biggest growth opportunities.",
  },
  {
    number: "02",
    title: "Strategy & Custom Plan",
    description:
      "We build a tailored roadmap — specific to your industry, market, and goals — with clear deliverables and timelines.",
  },
  {
    number: "03",
    title: "Build & Launch",
    description:
      "We execute with precision and speed. No endless revision cycles. Fast, clean, and live faster than you expect.",
  },
  {
    number: "04",
    title: "Optimize & Scale",
    description:
      "Ongoing tracking, reporting, and improvement. We watch the numbers so you don't have to, and adjust to keep growth compounding.",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(lineRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          end: "bottom 65%",
          scrub: 1,
        },
      });

      // Fade-in each step card
      gsap.from(".process-step", {
        opacity: 0,
        y: 32,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
            How It Works
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-5">
            From zero to{" "}
            <span className="text-gradient">ranked in 4 steps</span>
          </h2>
        </div>

        {/* Steps grid */}
        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div className="absolute top-7 left-0 right-0 h-px bg-white/[0.07] hidden md:block overflow-hidden">
            <div
              ref={lineRef}
              className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] origin-left scale-x-0"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
            {STEPS.map((step) => (
              <div key={step.number} className="process-step relative flex flex-col">
                {/* Number circle */}
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-[#0a0a0a] mb-6 z-10">
                  <span className="font-mono text-sm font-bold text-gradient">
                    {step.number}
                  </span>
                </div>

                {/* Vertical connector for mobile */}
                <div className="md:hidden absolute left-7 top-14 bottom-0 w-px bg-white/[0.07]" />

                <h3 className="text-base font-semibold text-white mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
