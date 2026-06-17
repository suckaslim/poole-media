import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#080810]">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background:
            "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.08), rgba(99,102,241,0.15))",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-[#6366f1]/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-[#8b5cf6]/10 blur-[120px] pointer-events-none" />

      {/* Border top/bottom */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6366f1]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#6366f1]/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-5">
          Get Started Today
        </p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6">
          Ready to get found in{" "}
          <span className="text-gradient">AI search?</span>
        </h2>
        <p className="text-lg text-white/55 leading-relaxed max-w-xl mx-auto mb-10">
          Book a free 30-minute audit. We&apos;ll review your digital presence,
          identify your biggest growth opportunities, and leave you with a clear
          action plan — no commitment required.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-8 py-4 text-base font-semibold text-white shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Get Your Free Audit
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-lg border border-white/[0.15] bg-white/[0.04] px-8 py-4 text-base font-semibold text-white/80 hover:text-white hover:border-white/30 transition-all duration-200"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}
