import { Skeleton } from "@/components/ui/skeleton"

export function HolidayLoadingState() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-in">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <HolidayCardSkeleton key={i} index={i} />
      ))}
    </div>
  )
}

function HolidayCardSkeleton({ index }: { index: number }) {
  return (
    <div
      className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm animate-pulse"
      style={{
        opacity: 0,
        animation: `fadeIn 0.5s ease-out forwards ${index * 100}ms`,
      }}
    >
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-1" />
      </div>
      <div className="p-6 pt-2">
        <Skeleton className="h-5 w-32 rounded-full mb-2" />
      </div>
      <div className="p-6 pt-0">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  )
}

