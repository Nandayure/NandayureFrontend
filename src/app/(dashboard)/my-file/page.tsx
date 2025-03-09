"use client"

import { useGetMyFolders } from "@/hooks"
import FolderSkeleton from "@/components/document-management/folders/folder-skeleton"
import FolderError from "@/components/document-management/folders/folder-error"
import FolderEmpty from "@/components/document-management/folders/folder-empty"
import FolderGrid from "@/components/document-management/folders/folder-grid"

export default function Page() {
  const { myFolders, isLoading, isError, error, refetch } = useGetMyFolders()

  if (isLoading) {
    return <FolderSkeleton />
  }

  if (isError) {
    return <FolderError error={error} onRetry={refetch} />
  }

  if (!myFolders || myFolders.length === 0) {
    return <FolderEmpty onRefresh={refetch} />
  }

  return (
    <div className="container mx-auto py-10">
      <FolderGrid folders={myFolders} />
    </div>
  )
}

