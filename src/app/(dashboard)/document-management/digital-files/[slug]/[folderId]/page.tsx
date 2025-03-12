"use client"

import { useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { LayoutGrid, List } from "lucide-react"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Suspense } from "react"
import PdfFileGrid from "@/components/document-management/my-files/PdfFileGrid"
import { BackButton } from "@/components/ui/back-button"
import { useEmployeeFiles } from "@/hooks/files/useEmployeeFiles"
import PDFUploader from "@/components/common/pdf-uploader"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/section-title"
import SkeletonLoader from "@/components/ui/skeleton-loader"
import PdfFileList from "@/components/document-management/my-files/pdf-file-list"

export default function Page() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [previousViewMode, setPreviousViewMode] = useState<"grid" | "list">("grid")

  const params = useParams<{ slug: string; folderId: string }>()
  const searchParams = useSearchParams()

  const folderName = searchParams.get("folderName") ? decodeURIComponent(searchParams.get("folderName")!) : "Archivos"

  const { files, isLoading, isError, error } = useEmployeeFiles(params.folderId)

  const handleViewModeChange = (value: string) => {
    if (value === "grid" || value === "list") {
      setPreviousViewMode(viewMode)
      setViewMode(value as "grid" | "list")
    }
  }

  return (
    <MotionConfig
      transition={{
        type: "spring",
        duration: 0.4,
        bounce: 0.1,
      }}
    >
      <div className="container mx-auto py-10">
        <div className="mb-4 flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <BackButton href={`/document-management/digital-files/${params.slug}`} label="Volver a mis carpetas" />
          </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <PageHeader title={`Documentos - ${folderName}`} description="Acceso a los documentos del empleado." />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex items-center gap-3 self-end sm:self-auto"
          >
            <ToggleGroup type="single" value={viewMode} onValueChange={handleViewModeChange}>
              <ToggleGroupItem value="grid" aria-label="Vista de cuadrícula" className="relative">
                <LayoutGrid className="h-4 w-4" />
                {viewMode === "grid" && (
                  <motion.div
                    layoutId="filesViewIndicator"
                    className="absolute inset-0 bg-primary/10 rounded-sm -z-10"
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="Vista de lista" className="relative">
                <List className="h-4 w-4" />
                {viewMode === "list" && (
                  <motion.div
                    layoutId="filesViewIndicator"
                    className="absolute inset-0 bg-primary/10 rounded-sm -z-10"
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </ToggleGroupItem>
            </ToggleGroup>

            <PDFUploader folderId={params.folderId}>
              <Button>Subir archivo</Button>
            </PDFUploader>
          </motion.div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={viewMode}
            initial={{
              opacity: 0,
              x: viewMode === "grid" && previousViewMode === "list" ? -20 : 20,
              filter: "blur(8px)",
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: viewMode === "grid" ? 20 : -20,
              filter: "blur(8px)",
              scale: 0.97,
            }}
            transition={{ duration: 0.3 }}
          >
            <Suspense fallback={<SkeletonLoader />}>
              {viewMode === "grid" ? (
                <PdfFileGrid files={files} isLoading={isLoading} isError={isError} error={error} />
              ) : (
                <PdfFileList files={files} isLoading={isLoading} isError={isError} error={error} />
              )}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}

