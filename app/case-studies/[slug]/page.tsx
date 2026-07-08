import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { createReadClient } from "@/lib/supabase";
import { CaseStudyDetailImage } from "@/components/shared/CaseStudyDetailImage";
import { JsonLd } from "@/components/shared/JsonLd";

const getCaseStudy = cache(async (slug: string) => {
  const supabase = createReadClient();
  const { data } = await supabase
    .from("case_studies")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
});

export async function generateStaticParams() {
  const supabase = createReadClient();
  const { data } = await supabase.from("case_studies").select("slug");
  return (data ?? []).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCaseStudy(slug);

  if (!data) return { title: "Case Study Not Found" };

  const imageUrl = data.image_ext
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/case_study_images/${data.slug}.${data.image_ext}`
    : null;

  return {
    title: `${data.client_name} — Case Study`,
    description: data.tagline,
    alternates: {
      canonical: `/case-studies/${data.slug}`,
    },
    openGraph: {
      title: `${data.client_name} — Case Study | Poole Media`,
      description: data.tagline,
      images: [{ url: imageUrl ? imageUrl : "", width: 1200, height: 630, alt: data.client_name }],
      type: "article",
      url: `https://poole.media/case-studies/${data.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.client_name} — Case Study`,
      description: data.tagline,
      images: [imageUrl ? imageUrl : ""],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = await getCaseStudy(slug);

  if (!cs) notFound();

  const imageUrl = cs.image_ext
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/case_study_images/${cs.slug}.${cs.image_ext}`
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://poole.media",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Case Studies",
        item: "https://poole.media/case-studies",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cs.client_name,
        item: `https://poole.media/case-studies/${cs.slug}`,
      },
    ],
  };

  return (
    <main>
      <JsonLd data={breadcrumbSchema} />

      {/* Back nav */}
      <div className="pt-28 pb-4 bg-[#080810]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            All Case Studies
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative pb-16 bg-[#080810] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.1),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
            Case Study
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-4">
            {cs.client_name}
          </h1>
          <p className="text-xl text-white/55 max-w-2xl">{cs.tagline}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              <CaseStudyDetailImage src={imageUrl} alt={cs.client_name} />

              <div>
                <h2 className="font-display text-2xl font-semibold text-white mb-4">
                  About the Project
                </h2>
                <p className="text-white/60 leading-relaxed text-lg">
                  {cs.description}
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold text-white mb-4">
                  Results
                </h2>
                <div className="rounded-2xl border border-[#6366f1]/20 bg-[#6366f1]/5 p-6">
                  <p className="text-white/70 leading-relaxed">{cs.results}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">
                  Project Details
                </h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-xs text-white/40 mb-1">Client</dt>
                    <dd className="text-sm font-medium text-white">
                      {cs.client_name}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-white/40 mb-1">Agency</dt>
                    <dd className="text-sm font-medium text-white">
                      Poole Media
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-white/40 mb-1">Location</dt>
                    <dd className="text-sm font-medium text-white">
                      Tri-Cities, WA
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <h3 className="text-sm font-semibold text-white mb-2">
                  Want similar results?
                </h3>
                <p className="text-sm text-white/50 mb-5 leading-relaxed">
                  Book a free audit and we&apos;ll show you what&apos;s possible
                  for your business.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 w-full justify-center rounded-lg bg-gradient-brand px-4 py-3 text-sm font-semibold text-white hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
                >
                  Get Free Audit
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
