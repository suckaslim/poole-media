function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-white/[0.05] ${className ?? ""}`} />
  );
}

export default function BlogPostLoading() {
  return (
    <main>
      <div className="pt-[152px] pb-4 bg-[#080810]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
      <div className="relative pb-10 bg-[#080810]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-4 w-24 mb-6" />
          <Skeleton className="h-8 w-32 mb-4 rounded-full" />
          <Skeleton className="h-12 w-full max-w-xl mb-5" />
          <Skeleton className="h-5 w-64" />
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-2 mb-4">
        <Skeleton className="aspect-video rounded-2xl" />
      </div>
      <div className="py-12 md:py-16 bg-[#0a0a0a]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 max-w-3xl space-y-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    </main>
  );
}
