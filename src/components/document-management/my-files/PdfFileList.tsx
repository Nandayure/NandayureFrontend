"use client"

import { FileText, Eye, Calendar, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import Image from "next/image"
import SkeletonLoader from "../SkeletonLoader"
import DeleteFile from "./delete-file-alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { PaginationController } from "@/components/ui/pagination-controller"
import { FileItem, GetFilesQueryParams } from "@/types"

type OrderByType = NonNullable<GetFilesQueryParams['orderBy']>
type OrderDirectionType = NonNullable<GetFilesQueryParams['orderDirection']>

type PdfFileListProps = {
  files: FileItem[] | undefined
  isLoading: boolean
  isError: boolean
  error?: Error | null
  hideDeleteButton?: boolean
  total?: number
  filters?: GetFilesQueryParams
  updateFilters?: (filters: Partial<GetFilesQueryParams>) => void
  loadNextPage?: () => void
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
}

const PdfFileList = ({
  files,
  isError,
  isLoading,
  error,
  hideDeleteButton = false,
  total = 0,
  filters,
  updateFilters,
  loadNextPage,
  hasNextPage,
  isFetchingNextPage
}: PdfFileListProps) => {
  if (isLoading) return <SkeletonLoader />
  if (isError) return <div className="text-red-500 text-center">{error?.message || "Error al cargar archivos"}</div>

  const getHigherQualityThumbnail = (thumbnailUrl: string): string => {
    if (!thumbnailUrl) return ""
    return thumbnailUrl.replace(/=s\d+$/, "=s800")
  }

  const handleViewFile = async (fileId: string) => {
    alert(`Viewing file with ID: ${fileId}`)
  }

  return (
    <div className="container mx-auto p-4">
      {updateFilters && (
        <div className="mb-6 flex flex-wrap gap-4">
          <Input
            placeholder="Buscar por nombre..."
            value={filters?.name || ''}
            onChange={(e) => updateFilters({ name: e.target.value })}
            className="w-full md:w-64"
          />
          <Select
            value={filters?.orderBy || 'modifiedTime'}
            onValueChange={(value: OrderByType) => updateFilters({ orderBy: value })}
          >
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modifiedTime">Fecha de modificación</SelectItem>
              <SelectItem value="name">Nombre</SelectItem>
              <SelectItem value="createdTime">Fecha de creación</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filters?.orderDirection || 'desc'}
            onValueChange={(value: OrderDirectionType) => updateFilters({ orderDirection: value })}
          >
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Dirección" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascendente</SelectItem>
              <SelectItem value="desc">Descendente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {files && files.length > 0 ? (
        <div className="space-y-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all duration-200"
            >
              <div className="flex">
                <div className="relative w-24 h-24 shrink-0">
                  {file.thumbnailLink ? (
                    <Image
                      src={getHigherQualityThumbnail(file.thumbnailLink)}
                      alt={`Vista previa de ${file.name}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                      priority
                      quality={100}
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-50 dark:bg-gray-700 flex items-center justify-center">
                      <FileText className="w-10 h-10 text-blue-500 dark:text-blue-400" />
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col sm:flex-row grow justify-between">
                  <div className="grow">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                      {file.name}
                    </h3>
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
                          className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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
          ))}

          {loadNextPage && hasNextPage && (
            <div className="mt-6 flex justify-center">
              <Button
                onClick={loadNextPage}
                disabled={isFetchingNextPage}
                variant="outline"
                className="min-w-[200px]"
              >
                {isFetchingNextPage ? 'Cargando...' : 'Cargar más'}
              </Button>
            </div>
          )}

          {total > 0 && (
            <div className="text-center text-sm text-muted-foreground mt-4">
              Total: {total} archivos
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500">No se encontraron archivos.</div>
      )}
    </div>
  )
}

export default PdfFileList
