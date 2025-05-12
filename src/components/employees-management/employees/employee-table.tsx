"use client"

import { MoreHorizontal, Eye } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SkeletonLoader from "@/components/ui/skeleton-loader"
import { formatDate } from "@/lib/utils"
import { PaginationController } from "@/components/ui/pagination-controller"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

interface EmployeeTableProps {
  employees: any[]
  pagination: any
  isLoading: boolean
  currentPage: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onViewEmployee: (employee: any) => void
}

export function EmployeeTable({
  employees,
  pagination,
  isLoading,
  currentPage,
  itemsPerPage,
  onPageChange,
  onViewEmployee,
}: EmployeeTableProps) {
  const handleViewEmployee = (employee: any) => {
    // Asegurarse de que el empleado tenga la estructura correcta
    const formattedEmployee = {
      ...employee,
      MaritalStatus: employee.MaritalStatus || { id: "", Name: "" },
      Gender: employee.Gender || { id: "", Name: "" },
      JobPosition: employee.JobPosition || {
        id: "",
        Name: "",
        Department: { id: "", name: "" }
      }
    }
    onViewEmployee(formattedEmployee)
  }

  return (
    <>
      <div className="rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre completo</TableHead>
              <TableHead>Puesto</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Fecha contratación</TableHead>
              <TableHead>Días vacaciones</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: itemsPerPage }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: 9 }).map((_, idx) => (
                    <TableCell key={idx}>
                      <SkeletonLoader className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : employees?.length > 0 ? (
              employees?.map((employee) => (
                <TableRow key={employee.id} className="group">
                  <TableCell className="font-medium">{employee.id}</TableCell>
                  <TableCell>{`${employee.Name?.trim()} ${employee.Surname1?.trim()} ${employee.Surname2}`}</TableCell>
                  <TableCell>{employee.JobPosition?.Name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-slate-100">
                      {employee.JobPosition?.Department?.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate" title={employee.Email}>
                    {employee.Email}
                  </TableCell>
                  <TableCell>{employee.CellPhone}</TableCell>
                  <TableCell>{formatDate(employee.HiringDate?.toString())}</TableCell>
                  <TableCell>{employee.AvailableVacationDays}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 p-0 opacity-70 group-hover:opacity-100"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menú</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewEmployee(employee)}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Ver detalles</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!isLoading && pagination?.totalPages > 1 && (
        <PaginationController
          totalItems={pagination.totalItems}
          itemsPerPage={Number(pagination.limit)}
          currentPage={currentPage}
          onPageChange={onPageChange}
          siblingCount={1}
          className="mt-4"
        />
      )}
    </>
  )
}
