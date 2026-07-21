import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AuditTeaser() {
  return (
    <section className="py-20 md:py-28 bg-[#060610] border-t border-white/[0.05]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#6366f1]/25 bg-gradient-to-b from-[#6366f1]/[0.07] to-transparent p-8 md:p-12 text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
            Free Instant Audit
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white mb-5">
            Find out what&apos;s hurting your SEO — in 30 seconds.
          </h2>
          <p className="text-white/55 leading-relaxed mb-8 text-lg">
            Enter your URL and our agent crawls your homepage instantly. No
            sign-up, no email, no commitment. Just a clear picture of what&apos;s
            holding your site back.
          </p>
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Run Your Free Audit
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-5 text-xs text-white/35">
            Homepage audit only · Full site audits available via consultation
          </p>
        </div>
      </div>
    </section>
  );
}
