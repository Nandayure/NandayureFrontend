'use client'

import { Suspense, useState } from "react"
import PdfFileGrid from "@/components/document-management/my-files/PdfFileGrid"
import PdfFileList from "@/components/document-management/my-files/PdfFileList"
import { BackButton } from "@/components/ui/back-button"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { PageHeader } from "@/components/ui/section-title"
import { LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks/use-debounce"
import useGetUserFiles from "@/hooks/files/useUserFiles"

export default function Page() {
  const params = useParams<{ slug: string }>()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(
    (searchParams.get('view') as 'grid' | 'list') || 'grid'
  )

  const folderName = searchParams.get('folderName')
    ? decodeURIComponent(searchParams.get('folderName')!)
    : 'Archivos'

  const searchValue = searchParams.get('search') || ""
  const orderBy = searchParams.get('orderBy') as any || 'modifiedTime'
  const orderDirection = searchParams.get('orderDirection') as 'asc' | 'desc' || 'desc'
  const pageToken = searchParams.get('pageToken') || undefined
  const itemsPerPage = 12

  const [filters, setFilters] = useState({
    name: searchValue,
    orderBy,
    orderDirection,
  })

  const debouncedFilters = useDebounce(filters, 500)

  const {
    files,
    isLoading,
    isError,
    error,
    pagination,
  } = useGetUserFiles(params.slug, {
    pageToken,
    limit: itemsPerPage,
    ...debouncedFilters
  })

  const updateURL = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    router.push('?' + params.toString())
  }

  const handlePageChange = (token: string | null) => {
    updateURL({ pageToken: token || "" })
  }

  const handleFiltersChange = (newFilters: Partial<typeof filters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    updateURL({
      ...updatedFilters,
      pageToken: '', // reset al cambiar filtros
    })
  }

  const toggleViewMode = () => {
    const newMode = viewMode === 'grid' ? 'list' : 'grid'
    setViewMode(newMode)
    updateURL({ view: newMode })
  }

  const commonProps = {
    files,
    isLoading,
    isError,
    error,
    hideDeleteButton: true,
    pagination: {
      limit: itemsPerPage,
      currentPage: 1,
      nextPageToken: pagination?.nextPageToken,
      previusPageToken: pagination?.previusPageToken,
      hasNextPage: !!pagination?.nextPageToken,
      hasPreviusPage: !!pagination?.previusPageToken
    },
    onPageChange: handlePageChange,
    filters,
    updateFilters: handleFiltersChange,
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="mb-4 flex items-center gap-2">
          <BackButton href="/my-file" label="Volver a mis carpetas" />
        </div>
        <div className="flex justify-between items-center mb-6">
          <PageHeader
            title={`Documentos - ${folderName}`}
            description="Acceso a los documentos del empleado."
          />
          <Button
            variant="outline"
            size="icon"
            onClick={toggleViewMode}
            className="ml-4"
          >
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <Suspense fallback={<div>Cargando archivos...</div>}>
        {viewMode === 'grid' ? (
          <PdfFileGrid {...commonProps} />
        ) : (
          <PdfFileList {...commonProps} />
        )}
      </Suspense>
    </>
  )
}
