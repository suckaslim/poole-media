"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Particles, {
  ParticlesProvider,
  useParticlesProvider,
} from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import type { FC } from "react";

const PARTICLE_OPTIONS: ISourceOptions = {
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    color: { value: ["#6366f1", "#8b5cf6", "#a78bfa"] },
    links: {
      color: "#6366f1",
      distance: 150,
      enable: true,
      opacity: 0.25,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.8,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "bounce" },
    },
    number: {
      value: 55,
      density: { enable: true },
    },
    opacity: { value: { min: 0.1, max: 0.5 } },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "connect" },
      resize: { enable: true },
    },
    modes: {
      connect: { distance: 160, links: { opacity: 0.5 }, radius: 120 },
    },
  },
  detectRetina: true,
};

async function initParticles(engine: Engine) {
  await loadSlim(engine);
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const ParticlesCanvas: FC = () => {
  const { loaded } = useParticlesProvider();
  if (!loaded) return null;
  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0 z-0"
      options={PARTICLE_OPTIONS}
    />
  );
};

export function Hero({
  headlineLine1,
  headlineLine2,
  subheadline,
  ctaPrimary,
  ctaSecondary,
}: {
  headlineLine1: string;
  headlineLine2: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
}) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  // Fade out as the indicator moves away from the bottom of the viewport
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0.15, 0.4], [1, 0]);

  // Collapse height + margin once opacity has reached zero
  const [collapsed, setCollapsed] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (p) => setCollapsed(p > 0.45));

  return (
    <section ref={heroRef} style={{ minHeight: "100svh" }} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080810]">
      {/* Particle field */}
      <ParticlesProvider init={initParticles}>
        <ParticlesCanvas />
      </ParticlesProvider>

      {/* Radial gradient vignette */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.18),transparent)]" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center py-32 pt-40"
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/60 mb-8"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />
          AI-Driven Digital Marketing · Tri-Cities, WA
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-display font-semibold tracking-tight leading-[1.05]"
        >
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white">
            {headlineLine1}
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gradient mt-1">
            {headlineLine2}
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="mt-8 mx-auto max-w-2xl text-lg md:text-xl text-white/55 leading-relaxed"
        >
          {subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            {ctaPrimary}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-lg border border-white/[0.15] bg-white/[0.04] px-7 py-3.5 text-base font-semibold text-white/80 hover:text-white hover:border-white/30 hover:bg-white/[0.07] transition-all duration-200"
          >
            {ctaSecondary}
          </Link>
        </motion.div>

        {/* Scroll indicator — outer handles scroll-based fade + collapse, inner handles entry animation */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          initial={{ marginTop: "5rem" }}
          animate={{
            height: collapsed ? 0 : "auto",
            marginTop: collapsed ? 0 : "5rem",
          }}
          transition={{ duration: 0.15 }}
          className="overflow-hidden flex justify-center"
          aria-hidden="true"
        >
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center gap-2 text-white/25"
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <div className="h-8 w-px rounded-full bg-gradient-to-b from-transparent to-white/30" />
              <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
