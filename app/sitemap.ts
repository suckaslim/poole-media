import type { MetadataRoute } from "next";
import { createReadClient } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://poole.media";

  const supabase = createReadClient();
  const { data: caseStudies } = await supabase
    .from("case_studies")
    .select("slug, created_at");

  const caseStudyEntries: MetadataRoute.Sitemap = (caseStudies ?? []).map(
    (cs) => ({
      url: `${baseUrl}/case-studies/${cs.slug}`,
      lastModified: new Date(cs.created_at),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...caseStudyEntries,
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
