"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-[#0a0a0a]">
      <div className="text-center max-w-sm mx-auto px-4">
        <p className="font-mono text-xs text-[#6366f1] uppercase tracking-widest mb-5">
          Something went wrong
        </p>
        <h2 className="font-display text-3xl font-semibold text-white mb-4">
          We hit an error
        </h2>
        <p className="text-white/50 text-sm leading-relaxed mb-8">
          Don&apos;t worry — it&apos;s on us. Try refreshing or head back home
          and we&apos;ll sort it out.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white/80 hover:text-white transition-colors duration-200"
          >
            Go home
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
