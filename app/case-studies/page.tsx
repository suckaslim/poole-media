import type { Metadata } from "next";
import { createReadClient } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Case Studies — Real Client Results",
  description:
    "See how Poole Media has helped local businesses across Washington grow their online presence with AI-ready websites and agentic SEO.",
  openGraph: {
    title: "Case Studies — Real Client Results | Poole Media",
    description:
      "Real results from real businesses. Explore our work building fast, AI-ready websites for local companies.",
    type: "website",
    url: "https://poole.media/case-studies",
  },
};
import { CaseStudyCard } from "@/components/shared/CaseStudyCard";

export default async function CaseStudiesPage() {
  const supabase = createReadClient();
  const { data: caseStudies } = await supabase
    .from("case_studies")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-[#080810] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.12),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
            Our Work
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight text-white mb-5">
            Case Studies
          </h1>
          <p className="text-xl text-white/55 leading-relaxed max-w-xl">
            Real results for real businesses. See how we&apos;ve helped local
            companies grow their online presence.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {caseStudies && caseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudies.map((cs) => (
                <CaseStudyCard key={cs.id} caseStudy={cs} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-white/30">
              <p className="text-lg">Case studies coming soon.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
