"use client"

import { useState, useEffect } from "react"
import { useGetAllEmployees } from "@/hooks"
import { Button } from "@/components/ui/button"
import { Trash2, Trash2Icon } from "lucide-react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import DeleteUserAlert from "./delete-user-alert"
import { Employee } from "@/types"
import { PaginationController } from "@/components/ui/pagination-controller"
import { SearchBar } from "@/components/ui/search-bar"
import { useSearchFilter } from "@/hooks/use-search-filter"

export default function ActiveUserTab() {
  const { employees, isError, isLoading } = useGetAllEmployees()
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10 // Número de usuarios por página

  // Usar el hook de búsqueda
  const { filteredData: filteredEmployees, setSearchValue } = useSearchFilter({
    data: employees || [],
    searchFields: ["id", "Name", "Surname1", "Surname2", "Email", "CellPhone"],
  })

  // Resetear la página cuando cambia la búsqueda
  useEffect(() => {
    setCurrentPage(1)
  }, [filteredEmployees.length])

  // Calcular los usuarios a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem)

  // Función para cambiar de página
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Función para manejar la búsqueda
  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  const handleDeleteClick = (employee: Employee) => {
    setSelectedEmployee(employee)
    setShowDeleteAlert(true)
  }


  if (isError) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Usuarios Activos</h2>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Ha ocurrido un error al cargar los usuarios. Por favor, intente nuevamente más tarde.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">Usuarios Activos</h2>
          <p className="text-muted-foreground">
            Aquí puedes gestionar los usuarios activos de tu aplicación.
          </p>
        </div>
        <SearchBar onSearch={handleSearch} placeholder="Buscar usuarios..." className="max-w-md" />
      </div>

      {isLoading ? (
        <SkeletonTable />
      ) : (
        <>
          <div>
            <Table>
              <TableCaption>Lista de empleados activos</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Cédula</TableHead>
                  <TableHead>Nombre Completo</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Días Vacaciones</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentEmployees.length > 0 ? (
                  currentEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.id}</TableCell>
                      <TableCell>{`${employee.Name} ${employee.Surname1} ${employee.Surname2}`}</TableCell>
                      <TableCell>{employee.Email}</TableCell>
                      <TableCell>{employee.CellPhone}</TableCell>
                      <TableCell>{employee.AvailableVacationDays}</TableCell>
                      <TableCell className="text-right">
                        <DeleteUserAlert employee={employee}>
                          <Button size={'sm'} variant={'outline'} className="flex items-center gap-2">
                            <Trash2Icon size={16} />
                            <span>Eliminar</span>
                          </Button>
                        </DeleteUserAlert>
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
          </div>

          {filteredEmployees.length > itemsPerPage && (
            <PaginationController
              totalItems={filteredEmployees.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              siblingCount={1}
              className="mt-4"
            />
          )}
        </>
      )}

      {showDeleteAlert && selectedEmployee && (
        <DeleteUserAlert
          employee={selectedEmployee}
        />
      )}
    </div>
  )
}

function SkeletonTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cédula</TableHead>
            <TableHead>Nombre Completo</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Días Vacaciones</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-40" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-48" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-10" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-8 w-8 rounded-full ml-auto" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
