function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-white/[0.05] ${className ?? ""}`} />
  );
}

export default function CaseStudyLoading() {
  return (
    <main>
      <div className="pt-28 pb-4 bg-[#080810]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="pb-16 bg-[#080810]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-3 w-20 mb-5" />
          <Skeleton className="h-14 w-80 mb-4" />
          <Skeleton className="h-6 w-[500px] max-w-full" />
        </div>
      </div>
      <div className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="aspect-video w-full rounded-2xl" />
              <div className="space-y-3">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-7 w-24" />
                <Skeleton className="h-24 w-full rounded-2xl" />
              </div>
            </div>
            <div className="space-y-5">
              <Skeleton className="h-48 rounded-2xl" />
              <Skeleton className="h-36 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
