"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useGetAllDepartments, useGetAllJobPositions } from "@/hooks"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import { PaginationController } from "@/components/ui/pagination-controller"
import { SearchBar } from "@/components/ui/search-bar"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebounce } from "@/hooks/use-debounce"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCw, Pencil, Trash, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import AddJobPositionsModal from "./add-job-positions-modal"
import EditJobPositionsModal from "./edit-job-positions-modal"
import DeleteJobPositionsModal from "./delete-job-positions-modal"

export default function JobPositionsTable() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const itemsPerPage = 5

  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1)
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || "")
  const debouncedSearch = useDebounce(searchValue, 500)

  const { jobPositions, pagination, isLoading, isError, error, refetch } = useGetAllJobPositions({
    page: String(currentPage),
    limit: String(itemsPerPage),
    name: debouncedSearch || undefined
  })
  const { departments = [] } = useGetAllDepartments()

  // Update URL when search or page changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debouncedSearch) {
      params.set('search', debouncedSearch)
    } else {
      params.delete('search')
    }
    params.set('page', currentPage.toString())
    router.push('?' + params.toString())
  }, [debouncedSearch, currentPage, router, searchParams])

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-48" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><Skeleton className="h-6 w-24" /></TableHead>
              <TableHead><Skeleton className="h-6 w-24" /></TableHead>
              <TableHead><Skeleton className="h-6 w-24" /></TableHead>
              <TableHead><Skeleton className="h-6 w-24" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton className="h-6 w-full" /></TableCell>
                <TableCell><Skeleton className="h-6 w-full" /></TableCell>
                <TableCell><Skeleton className="h-6 w-full" /></TableCell>
                <TableCell><Skeleton className="h-6 w-full" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error al cargar puestos de trabajo</AlertTitle>
        <AlertDescription>
          <div className="flex flex-col space-y-2">
            <p>{error instanceof Error ? error.message : 'Ha ocurrido un error al cargar los puestos de trabajo'}</p>
            <div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                className="mt-2"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reintentar
              </Button>
            </div>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <AddJobPositionsModal />
        <SearchBar
          onSearch={handleSearch}
          value={searchValue}
          placeholder="Buscar puestos..."
          className="max-w-md"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Departamento</TableHead>
            <TableHead className="w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobPositions.length > 0 ? (
            jobPositions.map((position) => (
              <TableRow key={position.id}>
                <TableCell>{position.id}</TableCell>
                <TableCell>{position.Name}</TableCell>
                <TableCell>{position.Description}</TableCell>
                <TableCell>
                  {departments.find((department) => department.id === position.DepartmentId)?.name || 'N/A'}
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <EditJobPositionsModal jobPosition={position} />
                    <DeleteJobPositionsModal id={position.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No se encontraron puestos de trabajo.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {!isLoading && pagination.totalPages > 1 && (
        <PaginationController
          totalItems={pagination.totalItems}
          itemsPerPage={Number(pagination.limit)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          siblingCount={1}
          className="mt-4"
        />
      )}
    </div>
  )
}
