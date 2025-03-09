import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

interface FolderSkeletonProps {
  count?: number
}

const FolderSkeleton = ({ count = 3 }: FolderSkeletonProps) => {
  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(count)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded-md" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-3 w-40 ml-8" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default FolderSkeleton

