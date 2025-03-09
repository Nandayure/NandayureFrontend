import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText } from "lucide-react";

const SkeletonLoader = () => (
  <div className="container mx-auto p-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm flex flex-col">
          {/* Thumbnail area */}
          <div className="relative w-full h-32">
            <div className="w-full h-32 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <Skeleton className="w-full h-full absolute" />
              <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 opacity-50" />
            </div>
          </div>

          {/* Content area */}
          <div className="p-4 flex flex-col h-[140px] justify-between">
            <div className="mb-2">
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-4 w-4/5" />

              {/* Date skeleton */}
              <div className="flex items-center mt-2">
                <Skeleton className="w-3 h-3 mr-1 rounded-full" />
                <Skeleton className="h-3 w-36" />
              </div>
            </div>

            {/* Button skeleton */}
            <Skeleton className="h-9 w-full mt-auto rounded-md" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SkeletonLoader;