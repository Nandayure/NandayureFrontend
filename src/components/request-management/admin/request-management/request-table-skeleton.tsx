import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface RequestTableSkeletonProps {
  itemCount: number
}

export const RequestTableSkeleton: React.FC<RequestTableSkeletonProps> = ({ itemCount }) => {
  return (
    <div className="w-full space-y-4">
      {Array.from({ length: itemCount }).map((_, index) => (
        <div
          key={index}
          className="flex items-center space-x-4 p-4 bg-white rounded-lg border"
        >
          <Skeleton className="h-4 w-8" /> {/* ID */}
          <Skeleton className="h-4 w-24" /> {/* Cédula */}
          <Skeleton className="h-4 w-32" /> {/* Nombre */}
          <Skeleton className="h-4 w-32" /> {/* Apellido */}
          <Skeleton className="h-4 w-32" /> {/* Tipo */}
          <Skeleton className="h-4 w-24" /> {/* Fecha */}
          <Skeleton className="h-6 w-20" /> {/* Estado */}
        </div>
      ))}
    </div>
  )
}

export default RequestTableSkeleton
