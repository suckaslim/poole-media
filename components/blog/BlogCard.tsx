import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import type { BlogIndexPost } from "@/types";

function formatDate(dateString: string | null) {
  if (!dateString) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

function CategoryBadges({ categories }: { categories: BlogIndexPost["categories"] }) {
  if (!categories || categories.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {categories.map((category) => (
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
  );
}

export function BlogCard({
  post,
  featured = false,
}: {
  post: BlogIndexPost;
  featured?: boolean;
}) {
  const imageUrl = post.coverImage
    ? urlFor(post.coverImage)
        .width(featured ? 1400 : 800)
        .height(featured ? 700 : 450)
        .url()
    : null;
  const date = formatDate(post.publishedAt);

  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug.current}`}
        className="group grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 rounded-2xl overflow-hidden bg-[#0a0a14] border border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:shadow-brand"
      >
        <div className="relative aspect-video md:aspect-auto overflow-hidden bg-gradient-to-br from-[#6366f1]/20 via-[#080818] to-[#8b5cf6]/20">
          {imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={post.coverImage?.alt ?? post.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8">
          <CategoryBadges categories={post.categories} />
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-white mb-3 tracking-tight group-hover:text-gradient transition-all duration-300">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-white/50 mb-5 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center gap-3 text-sm text-white/40">
            {post.author?.name && <span>{post.author.name}</span>}
            {post.author?.name && (date || post.readingTime) && <span>·</span>}
            {date && <span>{date}</span>}
            {date && post.readingTime && <span>·</span>}
            {post.readingTime && <span>{post.readingTime} min read</span>}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block rounded-2xl overflow-hidden bg-[#0a0a14] border border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:shadow-brand"
    >
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#6366f1]/20 via-[#080818] to-[#8b5cf6]/20">
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={post.coverImage?.alt ?? post.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent" />
      </div>

      <div className="p-6">
        <CategoryBadges categories={post.categories} />
        <h3 className="text-lg font-semibold text-white mb-2 tracking-tight group-hover:text-gradient transition-all duration-300">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-white/50 mb-4 line-clamp-2">{post.excerpt}</p>
        )}
        <div className="flex items-center gap-2 text-xs text-white/40">
          {date && <span>{date}</span>}
          {date && post.readingTime && <span>·</span>}
          {post.readingTime && <span>{post.readingTime} min read</span>}
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-white/40 group-hover:text-white/90 transition-colors duration-200">
          Read More
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
