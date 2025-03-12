"use client"

import { useState } from "react"
import { LayoutGrid, List } from "lucide-react"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useGetMyFolders } from "@/hooks"
import FolderSkeleton from "@/components/document-management/folders/folder-skeleton"
import FolderError from "@/components/document-management/folders/folder-error"
import FolderEmpty from "@/components/document-management/folders/folder-empty"
import FolderGrid from "@/components/document-management/folders/folder-grid"
import FolderList from "@/components/document-management/folders/folder-list"
import { PageHeader } from "@/components/ui/section-title"

export default function Page() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [previousViewMode, setPreviousViewMode] = useState<"grid" | "list">("grid")
  const { myFolders, isLoading, isError, error, refetch } = useGetMyFolders()

  const handleViewModeChange = (value: string) => {
    if (value === "grid" || value === "list") {
      setPreviousViewMode(viewMode)
      setViewMode(value)
    }
  }

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
    <MotionConfig transition={{
      type: "spring",
      duration: 0.4,
      bounce: 0.1
    }}>
      <div className="container mx-auto py-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <PageHeader
              title="Mis Documentos"
              description="Acceso a tus carpetas y documentos personales."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="self-end sm:self-auto"
          >
            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={handleViewModeChange}
            >
              <ToggleGroupItem
                value="grid"
                aria-label="Vista de cuadrícula"
                className="relative"
              >
                <LayoutGrid className="h-4 w-4" />
                {viewMode === "grid" && (
                  <motion.div
                    layoutId="viewModeIndicator"
                    className="absolute inset-0 bg-primary/10 rounded-sm -z-10"
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </ToggleGroupItem>
              <ToggleGroupItem
                value="list"
                aria-label="Vista de lista"
                className="relative"
              >
                <List className="h-4 w-4" />
                {viewMode === "list" && (
                  <motion.div
                    layoutId="viewModeIndicator"
                    className="absolute inset-0 bg-primary/10 rounded-sm -z-10"
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </ToggleGroupItem>
            </ToggleGroup>
          </motion.div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={viewMode}
            initial={{
              opacity: 0,
              x: viewMode === "grid" && previousViewMode === "list" ? -20 : 20,
              filter: "blur(8px)",
              scale: 0.97
            }}
            animate={{
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              scale: 1
            }}
            exit={{
              opacity: 0,
              x: viewMode === "grid" ? 20 : -20,
              filter: "blur(8px)",
              scale: 0.97
            }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === "grid" ? (
              <FolderGrid folders={myFolders} path="/my-file" />
            ) : (
              <FolderList folders={myFolders} path="/my-file" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}

