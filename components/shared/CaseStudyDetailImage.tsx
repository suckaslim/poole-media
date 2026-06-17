"use client";

import { useState } from "react";

export function CaseStudyDetailImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [error, setError] = useState(false);

  return (
    <div className="aspect-video relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#6366f1]/20 via-[#080818] to-[#8b5cf6]/20 border border-white/[0.08]">
      {!error && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
