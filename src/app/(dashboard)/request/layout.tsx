import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <Suspense fallback={<SkeletonLoading />}>
          {children}
        </Suspense>
      </div>
    </div>
  )
}

function SkeletonLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-[100px] w-full" />
      <div className="bg-white border shadow-md rounded-lg overflow-hidden p-6">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-1/4 ml-auto" />
      </div>
    </div>
  )
}