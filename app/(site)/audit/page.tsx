import type { Metadata } from "next";
import { AuditTool } from "@/components/audit/AuditTool";
import { client } from "@/sanity/lib/client";
import { auditPageQuery, type AuditPageData } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Free SEO Audit — See How Your Site Scores",
  description:
    "Get an instant SEO audit of any website. Enter your URL and see exactly what is hurting your search visibility — free, no email required.",
  alternates: {
    canonical: "/audit",
  },
  openGraph: {
    title: "Free SEO Audit — See How Your Site Scores | Poole Media",
    description:
      "Get an instant SEO audit of any website — free, no email required.",
    type: "website",
    url: "https://poole.media/audit",
  },
};

const FALLBACK: AuditPageData = {
  label: "Free SEO Audit",
  headline: "See how your site scores in 30 seconds.",
  subheadline:
    "Enter any URL below and our agent will crawl your homepage and surface the most common SEO issues holding your site back. Free, instant, no sign-up required.",
  postResultsCtaHeadline: "This was a homepage-only audit.",
  postResultsCtaBody:
    "Want us to crawl your entire site, analyze keyword gaps, check your competitors, and deliver a full report within 72 hours?",
};

export default async function AuditPage() {
  const data = await client
    .fetch<AuditPageData | null>(auditPageQuery)
    .catch(() => null);

  const label = data?.label ?? FALLBACK.label;
  const headline = data?.headline ?? FALLBACK.headline;
  const subheadline = data?.subheadline ?? FALLBACK.subheadline;
  const postResultsCtaHeadline =
    data?.postResultsCtaHeadline ?? FALLBACK.postResultsCtaHeadline;
  const postResultsCtaBody =
    data?.postResultsCtaBody ?? FALLBACK.postResultsCtaBody;

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-[#080810] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.12),transparent)]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
            {label}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6">
            {headline}
          </h1>
          <p className="text-xl text-white/55 leading-relaxed mb-12">
            {subheadline}
          </p>

          <div className="text-left">
            <AuditTool
              postResultsCtaHeadline={postResultsCtaHeadline}
              postResultsCtaBody={postResultsCtaBody}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
