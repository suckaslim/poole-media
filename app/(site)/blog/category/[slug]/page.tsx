import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { client } from "@/sanity/lib/client";
import {
  categoryBySlugQuery,
  categorySlugsQuery,
  postsByCategoryQuery,
} from "@/sanity/lib/queries";
import type { Category, BlogIndexPost } from "@/types";
import { BlogList } from "@/components/blog/BlogList";
import { JsonLd } from "@/components/shared/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://poole.media";

const getCategory = cache(async (slug: string) => {
  return client
    .fetch<Category | null>(categoryBySlugQuery, { slug })
    .catch(() => null);
});

export async function generateStaticParams() {
  const slugs = await client
    .fetch<Array<{ slug: { current: string } }>>(categorySlugsQuery)
    .catch(() => []);
  return slugs.map(({ slug }) => ({ slug: slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) return { title: "Category Not Found" };

  const description =
    category.description ?? `Browse all ${category.title} articles from Poole Media.`;

  return {
    title: `${category.title} Articles`,
    description,
    alternates: {
      canonical: `/blog/category/${category.slug.current}`,
    },
    openGraph: {
      title: `${category.title} Articles | Poole Media Blog`,
      description,
      type: "website",
      url: `${SITE_URL}/blog/category/${category.slug.current}`,
    },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) notFound();

  const posts = await client
    .fetch<BlogIndexPost[]>(postsByCategoryQuery, { categorySlug: slug })
    .catch(() => []);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: category.title,
        item: `${SITE_URL}/blog/category/${category.slug.current}`,
      },
    ],
  };

  return (
    <main>
      <JsonLd data={breadcrumbSchema} />

      {/* Breadcrumb */}
      <div className="pt-28 pb-4 bg-[#080810]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/40">
            <Link href="/" className="hover:text-white transition-colors duration-200">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors duration-200">
              Blog
            </Link>
            <span>/</span>
            <span className="text-white/70">{category.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative pb-16 bg-[#080810] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.12),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            All Posts
          </Link>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8b5cf6] mb-4">
            Category
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            {category.title}
          </h1>
          {category.description && (
            <p className="text-xl text-white/55 leading-relaxed max-w-xl mb-3">
              {category.description}
            </p>
          )}
          <p className="text-sm text-white/35">
            {posts.length} {posts.length === 1 ? "article" : "articles"}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BlogList posts={posts} />
        </div>
      </section>
    </main>
  );
}
