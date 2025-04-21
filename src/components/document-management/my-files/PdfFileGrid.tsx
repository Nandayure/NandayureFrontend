"use client"

import React from "react"
import SkeletonLoader from "../SkeletonLoader"
import FileCard from "../FileCard"
import { PaginationController } from "@/components/ui/pagination-controller"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { FileItem, GetFilesQueryParams } from "@/types"

type OrderByType = NonNullable<GetFilesQueryParams['orderBy']>
type OrderDirectionType = NonNullable<GetFilesQueryParams['orderDirection']>

type PdfFileGridProps = {
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

const PdfFileGrid = ({
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
}: PdfFileGridProps) => {
  if (isLoading) return <SkeletonLoader />
  if (isError) return <div className="text-red-500 text-center">{error?.message || "Error al cargar archivos"}</div>

  return (
    <div className="container mx-auto p-4 space-y-6">
      {updateFilters && (
        <div className="flex flex-wrap gap-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file) => (
            <FileCard key={file.id} file={file} hideDelete={hideDeleteButton} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No se encontraron archivos.</div>
      )}

      {hasNextPage && loadNextPage && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadNextPage}
            disabled={isFetchingNextPage}
            className="px-4 py-2 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            {isFetchingNextPage ? 'Cargando...' : 'Cargar más'}
          </button>
        </div>
      )}

      {total > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Total: {total} archivos
        </div>
      )}
    </div>
  )
}

export default PdfFileGrid