import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "You're All Set",
  description: "Your submission was received — we'll be in touch with a preview soon.",
  robots: { index: false, follow: false },
};

export default function GetStartedConfirmationPage() {
  return (
    <main>
      <section className="relative min-h-[70vh] flex items-center justify-center pt-[168px] pb-20 bg-[#080810] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.12),transparent)]" />
        <div className="relative mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#6366f1]/15 border border-[#6366f1]/20">
            <CheckCircle className="h-8 w-8 text-[#6366f1]" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-5">
            That&apos;s everything{" "}
            <span className="text-gradient">we need</span>
          </h1>
          <p className="text-lg text-white/55 leading-relaxed mb-10">
            I&apos;ll be back in touch with a live preview of your new site to
            review — no need to do anything else in the meantime.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-white/[0.15] bg-white/[0.04] px-7 py-3.5 text-base font-semibold text-white/80 hover:text-white hover:border-white/30 hover:bg-white/[0.07] transition-all duration-200"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
