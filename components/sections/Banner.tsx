import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

// Fixed under the navbar (h-16 mobile / h-20 desktop) — kept in sync with
// the h-10 height below and the matching pt-10 offset in app/(site)/layout.tsx
export function Banner({
  message = "Founding Client Offer — Claim your free build + 3 months free",
  ctaLabel = "Get Started",
  href = "/get-started",
}: {
  message?: string;
  ctaLabel?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className="fixed inset-x-0 top-16 md:top-20 z-40 flex h-10 items-center justify-center gap-2 bg-gradient-brand px-4 text-center text-sm text-white transition-[filter] duration-200 hover:brightness-110"
    >
      <Sparkles className="hidden sm:block h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="truncate">
        {message}
        <span className="ml-2 font-semibold underline underline-offset-2 decoration-white/40">
          {ctaLabel}
        </span>
      </span>
      <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
    </Link>
  );
}
