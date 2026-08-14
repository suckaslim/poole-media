import type { Metadata } from "next";
import { IntakeForm } from "@/components/sections/IntakeForm";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Tell us about your business and we'll start building your site right away — no call required. Takes under two minutes.",
  alternates: {
    canonical: "/get-started",
  },
  openGraph: {
    title: "Get Started with Poole Media",
    description:
      "Tell us about your business and we'll start building your site right away — no call required.",
    type: "website",
    url: "https://poole.media/get-started",
  },
};

export default function GetStartedPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-[168px] pb-16 md:pt-[200px] md:pb-20 bg-[#080810] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.12),transparent)]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
            Get Started
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight text-white mb-5">
            Let&apos;s build{" "}
            <span className="text-gradient">your site</span>
          </h1>
          <p className="text-xl text-white/55 leading-relaxed max-w-xl mx-auto">
            No call required. Tell us about your business below and we&apos;ll
            start building right away.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 md:p-9">
            <IntakeForm />
          </div>
        </div>
      </section>
    </main>
  );
}
