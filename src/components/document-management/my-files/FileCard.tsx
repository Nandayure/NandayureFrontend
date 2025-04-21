'use client'

import { FileText, Eye, Calendar, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import Image from "next/image"
import DeleteFile from "./delete-file-alert"
import { FileItem } from "@/types"

interface FileCardProps {
  file: FileItem;
  hideDelete?: boolean;
}

const FileCard = ({ file, hideDelete = false }: FileCardProps) => {
  const getHigherQualityThumbnail = (thumbnailUrl: string): string => {
    if (!thumbnailUrl) return ""
    return thumbnailUrl.replace(/=s\d+$/, "=s800")
  }

  const handleViewFile = async (fileId: string) => {
    // Implementación del visor
    alert(`Viewing file with ID: ${fileId}`)
  }

  return (
    <div className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      <div className="aspect-[4/3] relative bg-gray-100 dark:bg-gray-700">
        {file.thumbnailLink ? (
          <Image
            src={getHigherQualityThumbnail(file.thumbnailLink)}
            alt={`Vista previa de ${file.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority
            quality={100}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileText className="w-16 h-16 text-blue-500 dark:text-blue-400" />
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm line-clamp-2">
          {file.name}
        </h3>
        <div className="flex items-center justify-between mt-4 gap-2">
          <Button
            onClick={() => handleViewFile(file.id)}
            variant="default"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            <Eye className="w-4 h-4 mr-1.5" />
            Ver
          </Button>

          {!hideDelete && (
            <DeleteFile file={file}>
              <Button
                variant="outline"
                className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                size="sm"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </DeleteFile>
          )}
        </div>
      </div>
    </div>
  )
}

export default FileCard