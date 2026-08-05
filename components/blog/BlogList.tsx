import { BlogCard } from "@/components/blog/BlogCard";
import type { BlogIndexPost } from "@/types";

export function BlogList({
  posts,
  showFeatured = false,
}: {
  posts: BlogIndexPost[];
  showFeatured?: boolean;
}) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-24 text-white/30">
        <p className="text-lg">More posts coming soon — check back.</p>
      </div>
    );
  }

  const featuredPost = showFeatured ? posts.find((post) => post.featured) : undefined;
  const remainingPosts = featuredPost
    ? posts.filter((post) => post._id !== featuredPost._id)
    : posts;

  return (
    <div className="space-y-12">
      {featuredPost && <BlogCard post={featuredPost} featured />}

      {remainingPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remainingPosts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
