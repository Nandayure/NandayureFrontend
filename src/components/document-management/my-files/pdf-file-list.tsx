"use client"
import { FileText, Eye, Calendar, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import Image from "next/image"
import type { PdfFile } from "@/types"
import SkeletonLoader from "../SkeletonLoader"
import DeleteFile from "./delete-file-alert"
import { format } from "date-fns"

type PdfFileListProps = {
  files: PdfFile[] | undefined
  isLoading: boolean
  isError: boolean
  error?: Error | null
  hideDeleteButton?: boolean
}

const PdfFileList = ({ files, isError, isLoading, error, hideDeleteButton = false }: PdfFileListProps) => {
  if (isLoading) {
    return <SkeletonLoader />
  }

  if (isError) {
    return <div className="text-red-500 text-center">{error?.message || "An error occurred"}</div>
  }

  const getHigherQualityThumbnail = (thumbnailUrl: string): string => {
    if (!thumbnailUrl) return ""
    return thumbnailUrl.replace(/=s\d+$/, "=s800")
  }

  const getDateFromFileName = (fileName: string) => {
    const dateMatch = fileName.match(/(\d{4}-\d{2}-\d{2})\.pdf$/)
    if (dateMatch && dateMatch[1]) {
      try {
        const [year, month, day] = dateMatch[1].split("-").map(Number)
        return new Date(year, month - 1, day)
      } catch (e) {
        return null
      }
    }
    return null
  }

  const handleViewFile = async (fileId: string) => {
    // Mock implementation for demo
    alert(`Viewing file with ID: ${fileId}`)
  }

  return (
    <div className="container mx-auto p-4">
      {files && files.length > 0 ? (
        <div className="space-y-4">
          {files.map((file) => {
            const fileDate = getDateFromFileName(file.name)

            return (
              <div
                key={file.id}
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-24 h-24 sm:h-auto shrink-0">
                    {file.thumbnailLink ? (
                      <div className="w-full h-24 sm:h-full bg-gray-100 dark:bg-gray-700 overflow-hidden relative">
                        <Image
                          src={getHigherQualityThumbnail(file.thumbnailLink) || "/placeholder.svg"}
                          alt={`Vista previa de ${file.name}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 100px"
                          className="object-cover"
                          priority
                          quality={100}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-24 sm:h-full bg-blue-50 dark:bg-gray-700 flex items-center justify-center">
                        <FileText className="w-10 h-10 text-blue-500 dark:text-blue-400" />
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col sm:flex-row grow justify-between">
                    <div className="grow">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                        {file.name.replace(/\.pdf-\d{4}-\d{2}-\d{2}\.pdf$/, ".pdf")}
                      </h3>

                      {fileDate && (
                        <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{format(fileDate, "dd 'de' MMMM yyyy", { locale: es })}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center mt-3 sm:mt-0 space-x-2">
                      <Button
                        onClick={() => handleViewFile(file.id)}
                        variant="default"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        size="sm"
                      >
                        <Eye className="w-4 h-4 mr-1.5" />
                        Ver
                      </Button>

                      {!hideDeleteButton && (
                        <DeleteFile file={file}>
                          <Button
                            variant="outline"
                            className="border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            size="sm"
                          >
                            <Trash2 className="w-4 h-4 mr-1.5 text-red-500" />
                            Eliminar
                          </Button>
                        </DeleteFile>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center text-gray-500">No se encontraron archivos.</div>
      )}
    </div>
  )
}

export default PdfFileList

