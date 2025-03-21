"use client"

import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { FileText, Calendar } from "lucide-react"

const SkeletonLoader = () => (
  <div className="container mx-auto p-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col">
          {/* Thumbnail area */}
          <div className="relative w-full h-32">
            <div className="w-full h-32 bg-gray-100 dark:bg-gray-700 flex items-center justify-center relative">
              <Skeleton className="w-full h-full absolute" />
              <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 opacity-50" />
            </div>
          </div>

          {/* Content area - Matching the h-[180px] from FileCard */}
          <div className="p-4 flex flex-col h-[180px]">
            <div className="mb-2 grow">
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-4 w-4/5 mb-3" />

              {/* Date skeleton - mimic the Calendar icon and date text */}
              <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="w-3 h-3 mr-1 text-gray-300 dark:text-gray-600" />
                <Skeleton className="h-3 w-36" />
              </div>
            </div>

            {/* Button skeletons - matching the FileCard buttons */}
            <div className="mt-auto">
              <Skeleton className="h-9 w-full rounded-md mb-2" />
              <Skeleton className="h-9 w-full rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default SkeletonLoader