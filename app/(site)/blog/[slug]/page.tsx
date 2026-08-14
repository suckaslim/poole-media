import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  blogPostBySlugQuery,
  blogPostSlugsQuery,
  relatedPostsQuery,
} from "@/sanity/lib/queries";
import type { BlogPost, BlogIndexPost } from "@/types";
import { PortableText } from "@/components/blog/PortableText";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { JsonLd } from "@/components/shared/JsonLd";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://poole.media";

const getPost = cache(async (slug: string) => {
  return client
    .fetch<BlogPost | null>(blogPostBySlugQuery, { slug })
    .catch(() => null);
});

function formatDate(dateString: string | null) {
  if (!dateString) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

export async function generateStaticParams() {
  const slugs = await client
    .fetch<Array<{ slug: { current: string } }>>(blogPostSlugsQuery)
    .catch(() => []);
  return slugs.map(({ slug }) => ({ slug: slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Post Not Found" };

  const title = post.metaTitle ?? post.title;
  const description = post.metaDescription ?? post.excerpt ?? undefined;
  const ogImageSource = post.ogImage ?? post.coverImage;
  const ogImageUrl = ogImageSource
    ? urlFor(ogImageSource).width(1200).height(630).url()
    : null;

  return {
    title,
    description,
    alternates: {
      canonical: post.canonicalUrl ?? `/blog/${post.slug.current}`,
    },
    robots: post.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/blog/${post.slug.current}`,
      images: ogImageUrl
        ? [{ url: ogImageUrl, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const categorySlugs = post.categories.map((category) => category.slug.current);
  const related = await client
    .fetch<BlogIndexPost[]>(relatedPostsQuery, {
      slug: post.slug.current,
      categorySlugs,
    })
    .catch(() => []);

  const coverImageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1600).url()
    : null;
  const date = formatDate(post.publishedAt);
  const postUrl = `${SITE_URL}/blog/${post.slug.current}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  const articleSchema = post.enableArticleSchema
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt ?? post.summary ?? undefined,
        image: coverImageUrl ?? undefined,
        datePublished: post.publishedAt ?? undefined,
        dateModified: post.updatedAt ?? post.publishedAt ?? undefined,
        author: post.author ? { "@type": "Person", name: post.author.name } : undefined,
        publisher: { "@type": "Organization", name: "Poole Media" },
        keywords:
          [post.targetKeyword, ...(post.relatedKeywords ?? [])]
            .filter(Boolean)
            .join(", ") || undefined,
        mainEntityOfPage: postUrl,
      }
    : null;

  const hasFaq = post.faq && post.faq.length > 0;
  const faqSchema =
    hasFaq && post.enableFaqSchema !== false
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq!.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;

  return (
    <main>
      <JsonLd data={breadcrumbSchema} />
      {articleSchema && <JsonLd data={articleSchema} />}
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* Breadcrumb */}
      <div className="pt-[152px] pb-4 bg-[#080810]">
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
            <span className="text-white/70 truncate">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative pb-10 bg-[#080810] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.1),transparent)]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            All Posts
          </Link>

          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category) => (
                <span
                  key={category._id}
                  className="rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide"
                  style={{
                    borderColor: `${category.color ?? "#6366f1"}40`,
                    backgroundColor: `${category.color ?? "#6366f1"}14`,
                    color: category.color ?? "#a5b4fc",
                  }}
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-5">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-white/45">
            {post.author?.name && <span>{post.author.name}</span>}
            {post.author?.name && (date || post.readingTime) && <span>·</span>}
            {date && <span>{date}</span>}
            {date && post.readingTime && <span>·</span>}
            {post.readingTime && <span>{post.readingTime} min read</span>}
          </div>
        </div>
      </section>

      {coverImageUrl && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-2 mb-4">
          <div className="aspect-video relative rounded-2xl overflow-hidden border border-white/[0.08] max-h-[480px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverImageUrl}
              alt={post.coverImage?.alt ?? post.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <section className="py-12 md:py-16 bg-[#0a0a0a]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-10 lg:gap-12">
            {post.body && post.body.length > 0 ? (
              <TableOfContents body={post.body} />
            ) : (
              <div className="hidden lg:block" />
            )}

            <div className="max-w-3xl">
              {post.body && post.body.length > 0 && (
                <div className="lg:hidden">
                  <TableOfContents body={post.body} />
                </div>
              )}

              {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                <div className="rounded-2xl border border-[#6366f1]/20 bg-[#6366f1]/5 p-6 mb-10">
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-[#a5b4fc] mb-4">
                    Key Takeaways
                  </h2>
                  <ul className="space-y-2.5">
                    {post.keyTakeaways.map((takeaway, i) => (
                      <li key={i} className="flex gap-2.5 text-white/70 leading-relaxed">
                        <span className="text-[#8b5cf6] shrink-0">•</span>
                        {takeaway}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {post.body && post.body.length > 0 && <PortableText value={post.body} />}

              {hasFaq && (
                <div className="mt-12">
                  <h2 className="font-display text-2xl font-semibold text-white mb-4">
                    Frequently Asked Questions
                  </h2>
                  <Accordion>
                    {post.faq!.map((item, i) => (
                      <AccordionItem key={i} value={i}>
                        <AccordionTrigger className="text-base text-white/90 py-4">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-white/55">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}

              <div className="mt-12">
                <AuthorCard author={post.author} />
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-20 pt-16 border-t border-white/[0.08]">
              <RelatedPosts posts={related} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
