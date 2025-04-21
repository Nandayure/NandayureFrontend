"use client"
import SkeletonLoader from "../SkeletonLoader"
import FileCard from "../FileCard"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import type { FileItem, GetFilesQueryParams } from "@/types"

type OrderByType = NonNullable<GetFilesQueryParams["orderBy"]>
type OrderDirectionType = NonNullable<GetFilesQueryParams["orderDirection"]>

type PaginationType = {
  nextPageToken: string | null
  previusPageToken: string | null
  hasNextPage: boolean
  hasPreviusPage: boolean
}

type PdfFileGridProps = {
  files: FileItem[] | undefined
  isLoading: boolean
  isError: boolean
  error?: Error | null
  hideDeleteButton?: boolean
  total?: number
  filters?: GetFilesQueryParams
  updateFilters?: (filters: Partial<GetFilesQueryParams>) => void
  onPageChange?: (token: string | null) => void
  pagination?: PaginationType
}

const PdfFileGrid = ({
  files,
  isError,
  isLoading,
  error,
  hideDeleteButton = false,
  total = 0,
  filters,
  updateFilters,
  onPageChange,
  pagination,
}: PdfFileGridProps) => {
  if (isLoading) return <SkeletonLoader />
  if (isError) return <div className="text-red-500 text-center">{error?.message || "Error al cargar archivos"}</div>

  return (
    <div className="container mx-auto p-4 space-y-6">
      {updateFilters && (
        <div className="flex flex-wrap gap-4">
          <Input
            placeholder="Buscar por nombre..."
            value={filters?.name || ""}
            onChange={(e) => updateFilters({ name: e.target.value })}
            className="w-full md:w-64"
          />
          <Select
            value={filters?.orderBy || "modifiedTime"}
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
            value={filters?.orderDirection || "desc"}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file) => (
            <FileCard key={file.id} file={file} hideDelete={hideDeleteButton} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No se encontraron archivos.</div>
      )}

      {pagination && onPageChange && (
        <div className="mt-8 flex justify-center items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(pagination.previusPageToken)}
            disabled={!pagination.hasPreviusPage}
            aria-label="Página anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm text-muted-foreground">Página actual</span>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(pagination.nextPageToken)}
            disabled={!pagination.hasNextPage}
            aria-label="Página siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {total > 0 && <div className="text-center text-sm text-muted-foreground mt-2">Total: {total} archivos</div>}
    </div>
  )
}

export default PdfFileGrid
