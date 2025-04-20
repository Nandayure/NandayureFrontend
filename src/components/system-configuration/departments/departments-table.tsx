"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useGetAllDepartmentPrograms, useGetAllDepartments, useGetAllEmployees } from "@/hooks"
import SkeletonLoader from "@/components/ui/skeleton-loader"
import EditDepartmentModal from "./edit-department-modal"
import DeleteDepartmentModal from "./delete-department-modal"
import { useEffect, useState } from "react"
import { PaginationController } from "@/components/ui/pagination-controller"
import { SearchBar } from "@/components/ui/search-bar"
import AddDepartmentModal from "./add-department-modal"
import { DepartmentEmployeesModal } from "./department-employees-modal"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebounce } from "@/hooks/use-debounce"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DepartmentsTable() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const itemsPerPage = 5

  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1)
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || "")
  const debouncedSearch = useDebounce(searchValue, 500)

  const { departments, pagination, isLoading, isError, error, refetch } = useGetAllDepartments({
    page: String(currentPage),
    limit: String(itemsPerPage),
    name: debouncedSearch || undefined
  })

  const { departmentPrograms = [] } = useGetAllDepartmentPrograms()


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
  }, [debouncedSearch, currentPage])

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

  if (isError) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error al cargar departamentos</AlertTitle>
        <AlertDescription>
          <div className="flex flex-col space-y-2">
            <p>{error instanceof Error ? error.message : 'Ha ocurrido un error al cargar los departamentos'}</p>
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
        <AddDepartmentModal />
        <SearchBar
          onSearch={handleSearch}
          value={searchValue}
          placeholder="Buscar departamentos..."
          className="max-w-md"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Programa</TableHead>
            <TableHead>Jefe</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 6 }).map((_, idx) => (
                  <TableCell key={idx}>
                    <SkeletonLoader className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : departments.length > 0 ? (
            departments.map((department) => (
              <TableRow key={department.id}>
                <TableCell>{department.id}</TableCell>
                <TableCell>{department.name}</TableCell>
                <TableCell>{department.description}</TableCell>
                <TableCell>{departmentPrograms.find((program) => program.id === department.departmentProgramId)?.name || "N/A"}</TableCell>
                <TableCell>
                  {department.departmentHead.Name || "N/A"} {department.departmentHead.Surname1 || "N/A"} {department.departmentHead.Surname2 || ""}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <EditDepartmentModal department={department} departmentId={department.id} />
                    <DepartmentEmployeesModal
                      departmentId={department.id}
                      currentHeadId={department.departmentHeadId}
                    />
                    <DeleteDepartmentModal id={department.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No se encontraron resultados.
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

