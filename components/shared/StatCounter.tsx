"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface StatCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description?: string;
}

export function StatCounter({
  value,
  prefix = "",
  suffix = "",
  label,
  description,
}: StatCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const obj = { count: 0 };
      gsap.to(obj, {
        count: value,
        duration: 2.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
        onUpdate() {
          if (valueRef.current) {
            valueRef.current.textContent = `${prefix}${Math.round(obj.count)}${suffix}`;
          }
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex flex-col items-center text-center">
      <div className="text-5xl md:text-6xl font-display font-semibold text-gradient leading-none">
        <span ref={valueRef}>
          {prefix}0{suffix}
        </span>
      </div>
      <p className="mt-3 text-base font-semibold text-white">{label}</p>
      {description && (
        <p className="mt-1 text-sm text-white/45 max-w-[16ch]">{description}</p>
      )}
    </div>
  );
}
