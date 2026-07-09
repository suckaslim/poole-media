import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import {
  featuredCaseStudiesQuery,
  type CaseStudy,
} from "@/sanity/lib/queries";
import { CaseStudyCard } from "@/components/shared/CaseStudyCard";

export async function CaseStudiesPreview() {
  // TODO(sanity-migration): this used to query Supabase's case_studies
  // table (see lib/supabase.ts) — table/bucket still exist but are unused.
  const caseStudies = await client
    .fetch<CaseStudy[]>(featuredCaseStudiesQuery)
    .catch(() => []);

  if (!caseStudies.length) return null;

  return (
    <section className="py-24 md:py-32 bg-[#060610]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
              Our Work
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white">
              Results that{" "}
              <span className="text-gradient">speak for themselves</span>
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors duration-200 shrink-0"
          >
            View all case studies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((cs) => (
            <CaseStudyCard key={cs._id} caseStudy={cs} />
          ))}
        </div>
      </div>
    </section>
  );
}
