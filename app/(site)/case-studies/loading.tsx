function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-white/[0.05] ${className ?? ""}`} />
  );
}

export default function CaseStudiesLoading() {
  return (
    <main>
      <div className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-[#080810]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-3 w-20 mb-5" />
          <Skeleton className="h-12 w-64 mb-4" />
          <Skeleton className="h-5 w-96 max-w-full" />
        </div>
      </div>
      <div className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1].map((i) => (
              <Skeleton key={i} className="h-72 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
