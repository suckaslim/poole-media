"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/types/supabase";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = caseStudy.image_ext
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/case_study_images/${caseStudy.slug}.${caseStudy.image_ext}`
    : null;

  return (
    <Link
      href={`/case-studies/${caseStudy.slug}`}
      className="group block rounded-2xl overflow-hidden bg-[#0a0a14] border border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:shadow-brand"
    >
      {/* Image / Gradient placeholder */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#6366f1]/20 via-[#080818] to-[#8b5cf6]/20">
        {imageUrl && !imageError && (
          // eslint-disable-next-line @next/next-eslint/no-img-element
          <img
            src={imageUrl}
            alt={caseStudy.client_name}
            onError={() => setImageError(true)}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-2">
          Case Study
        </p>
        <h3 className="text-lg font-semibold text-white mb-2 tracking-tight group-hover:text-gradient transition-all duration-300">
          {caseStudy.client_name}
        </h3>
        <p className="text-sm text-white/50 mb-4 line-clamp-2">{caseStudy.tagline}</p>

        {/* Result pill */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 px-3 py-1 text-xs font-medium text-[#a5b4fc]">
          {caseStudy.results.split(".")[0]}
        </div>

        {/* Arrow */}
        <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-white/40 group-hover:text-white/90 transition-colors duration-200">
          View Case Study
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
