import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import {
  blogIndexQuery,
  allCategoriesQuery,
} from "@/sanity/lib/queries";
import { BlogList } from "@/components/blog/BlogList";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import type { BlogIndexPost, Category } from "@/types";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "SEO strategy, AI search tips, and digital marketing insights for local businesses in Tri-Cities, WA and beyond.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Poole Media",
    description:
      "SEO strategy, AI search tips, and digital marketing insights for local businesses in Tri-Cities, WA and beyond.",
    type: "website",
    url: "https://poole.media/blog",
  },
};

export default async function BlogIndexPage() {
  const [posts, categories] = await Promise.all([
    client.fetch<BlogIndexPost[]>(blogIndexQuery).catch(() => []),
    client.fetch<Category[]>(allCategoriesQuery).catch(() => []),
  ]);

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-[#080810] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.12),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
            Blog
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight text-white mb-5">
            Insights
          </h1>
          <p className="text-xl text-white/55 leading-relaxed max-w-xl">
            SEO strategy, AI search trends, and digital marketing advice for
            local businesses.
          </p>
        </div>
      </section>

      {/* Category filter + grid */}
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {categories.length > 0 && (
            <div className="mb-12">
              <CategoryFilter categories={categories} />
            </div>
          )}

          <BlogList posts={posts} showFeatured />
        </div>
      </section>
    </main>
  );
}
