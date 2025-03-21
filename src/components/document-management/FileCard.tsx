"use client"

import { FileText, Eye, Calendar, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getFileViewUrl } from "@/services"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import Image from "next/image"
import type { PdfFile } from "@/types"
import DeleteFile from "./my-files/delete-file-alert"

interface FileCardProps {
  file: PdfFile
  folderId?: string
  hideDelete?: boolean
}

const FileCard = ({ file, folderId, hideDelete = false }: FileCardProps) => {
  const handleViewFile = async () => {
    const fileBlob = await getFileViewUrl(file.id)
    const fileUrl = URL.createObjectURL(fileBlob)
    window.open(fileUrl, "_blank")
  }

  const getHigherQualityThumbnail = (thumbnailUrl: string): string => {
    if (!thumbnailUrl) return ""
    return thumbnailUrl.replace(/=s\d+$/, "=s800")
  }

  const getDateFromFileName = () => {
    const dateMatch = file.name.match(/(\d{4}-\d{2}-\d{2})\.pdf$/)
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

  const fileDate = getDateFromFileName()

  return (
    <div className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col">
      <div className="relative w-full h-32">
        {file.thumbnailLink ? (
          <div className="w-full h-32 bg-gray-100 dark:bg-gray-700 overflow-hidden relative">
            <Image
              src={getHigherQualityThumbnail(file.thumbnailLink) || "/placeholder.svg"}
              alt={`Vista previa de ${file.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-cover"
              priority
              quality={100}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
        ) : (
          <div className="w-full h-32 bg-blue-50 dark:bg-gray-700 flex items-center justify-center relative">
            <FileText className="w-16 h-16 text-blue-500 dark:text-blue-400" />
          </div>
        )}
      </div>

      <div className={`p-4 flex flex-col ${hideDelete ? 'h-[130px]' : 'h-[180px]'}`}>
        <div className="mb-2 grow">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2 text-sm sm:text-base">
            {file.name.replace(/\.pdf-\d{4}-\d{2}-\d{2}\.pdf$/, ".pdf")}
          </h3>

          {fileDate && (
            <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="w-3 h-3 mr-1" />
              <span>{formatDistanceToNow(fileDate, { addSuffix: true, locale: es })}</span>
            </div>
          )}
        </div>

        <div className="mt-auto">
          <Button
            onClick={handleViewFile}
            variant="default"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            <Eye className="w-4 h-4 mr-1.5" />
            Ver
          </Button>

          {!hideDelete && (
            <div className="mt-2">
              <DeleteFile file={file} folderId={folderId}>
                <Button
                  variant='outline'
                  className="w-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4 mr-1.5 text-red-500" />
                  Eliminar
                </Button>
              </DeleteFile>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FileCard