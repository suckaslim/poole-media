function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-white/[0.05] ${className ?? ""}`} />
  );
}

export default function BlogCategoryLoading() {
  return (
    <main>
      <div className="pt-28 pb-4 bg-[#080810]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="relative pb-16 bg-[#080810]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-4 w-24 mb-6" />
          <Skeleton className="h-3 w-20 mb-4" />
          <Skeleton className="h-12 w-64 mb-4" />
          <Skeleton className="h-5 w-96 max-w-full mb-3" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-72 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
