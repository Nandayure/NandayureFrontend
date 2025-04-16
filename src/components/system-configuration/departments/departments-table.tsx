"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useGetAllDepartmentPrograms, useGetAllDepartments, useGetAllEmployees } from "@/hooks"
import SkeletonLoader from "@/components/ui/skeleton-loader"
import EditDepartmentModal from "./edit-department-modal"
import DeleteDepartmentModal from "./delete-department-modal"
import { useEffect, useState } from "react"
import { PaginationController } from "@/components/ui/pagination-controller"
import { SearchBar } from "@/components/ui/search-bar"
import { useSearchFilter } from "@/hooks/use-search-filter"
import AddDepartmentModal from "./add-department-modal"
import { Button } from "@/components/ui/button"

export default function DepartmentsTable() {
  const { departments, isLoading } = useGetAllDepartments()
  const { departmentPrograms = [] } = useGetAllDepartmentPrograms()
  const { employees = [] } = useGetAllEmployees()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // Puedes ajustar esto según tus necesidades

  // Usar el hook de búsqueda
  const { filteredData: filteredDepartments, setSearchValue } = useSearchFilter({
    data: departments,
    searchFields: ["id", "name", "description", "departmentProgramId", "departmentHeadId"],
  })

  // Resetear la página cuando cambia la búsqueda
  useEffect(() => {
    setCurrentPage(1)
  }, [])

  // Calcular los departamentos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentDepartments = filteredDepartments.slice(indexOfFirstItem, indexOfLastItem)

  // Función para cambiar de página
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Función para manejar la búsqueda
  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <AddDepartmentModal />
        <SearchBar onSearch={handleSearch} placeholder="Buscar departamentos..." className="max-w-md" />
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
            Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 7 }).map((_, idx) => (
                  <TableCell key={idx}>
                    <SkeletonLoader className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : currentDepartments.length > 0 ? (
            currentDepartments.map((department) => (
              <TableRow key={department.id}>
                <TableCell>{department.id}</TableCell>
                <TableCell>{department.name}</TableCell>
                <TableCell>{department.description}</TableCell>
                <TableCell>{departmentPrograms.find((program) => program.id === department.departmentProgramId)?.name || "N/A"}</TableCell>
                <TableCell>
                  {employees.find((employee) => employee.id === department.departmentHeadId)?.Name} {employees.find((employee) => employee.id === department.departmentHeadId)?.Surname1 || "N/A"}
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <EditDepartmentModal department={department} departmentId={department.id} />
                    <DeleteDepartmentModal id={department.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No se encontraron resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {!isLoading && filteredDepartments.length > 0 && (
        <PaginationController
          totalItems={filteredDepartments.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          siblingCount={1}
          className="mt-4"
        />
      )}
    </div>
  )
}

