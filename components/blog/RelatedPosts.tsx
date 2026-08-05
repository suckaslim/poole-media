import { BlogCard } from "@/components/blog/BlogCard";
import type { BlogIndexPost } from "@/types";

export function RelatedPosts({ posts }: { posts: BlogIndexPost[] | null }) {
  if (!posts || posts.length === 0) return null;

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-white mb-6">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
