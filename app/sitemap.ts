import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import {
  caseStudiesQuery,
  blogIndexQuery,
  categorySlugsQuery,
  type CaseStudy,
} from "@/sanity/lib/queries";
import type { BlogIndexPost } from "@/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://poole.media";

  const [caseStudies, posts, categorySlugs] = await Promise.all([
    client.fetch<CaseStudy[]>(caseStudiesQuery).catch(() => []),
    client.fetch<BlogIndexPost[]>(blogIndexQuery).catch(() => []),
    client
      .fetch<Array<{ slug: { current: string } }>>(categorySlugsQuery)
      .catch(() => []),
  ]);

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${baseUrl}/case-studies/${cs.slug}`,
    lastModified: new Date(cs._createdAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogPostEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogCategoryEntries: MetadataRoute.Sitemap = categorySlugs.map(
    ({ slug }) => ({
      url: `${baseUrl}/blog/category/${slug.current}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
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
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/audit`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
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
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...blogPostEntries,
    ...blogCategoryEntries,
  ];
}
