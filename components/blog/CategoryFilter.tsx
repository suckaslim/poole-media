import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

export function CategoryFilter({
  categories,
  activeSlug,
}: {
  categories: Category[];
  activeSlug?: string;
}) {
  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter posts by category">
      <Link
        href="/blog"
        role="tab"
        aria-selected={!activeSlug}
        className={cn(
          "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-200",
          !activeSlug
            ? "border-white/20 bg-white/10 text-white"
            : "border-white/[0.08] text-white/50 hover:text-white hover:border-white/20"
        )}
      >
        All
      </Link>
      {categories.map((category) => {
        const isActive = category.slug.current === activeSlug;
        return (
          <Link
            key={category._id}
            href={`/blog/category/${category.slug.current}`}
            role="tab"
            aria-selected={isActive}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-200",
              !isActive && "text-white/50 hover:text-white"
            )}
            style={
              isActive
                ? {
                    borderColor: `${category.color ?? "#6366f1"}60`,
                    backgroundColor: `${category.color ?? "#6366f1"}1a`,
                    color: category.color ?? "#a5b4fc",
                  }
                : { borderColor: "rgba(255,255,255,0.08)" }
            }
          >
            {category.title}
          </Link>
        );
      })}
    </div>
  );
}
