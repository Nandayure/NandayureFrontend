"use client"

import { useState, useEffect } from "react"
import useGetUnavailableUsers from "@/hooks/user/queries/useGetUnavailableUsers"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { PaginationController } from "@/components/ui/pagination-controller"
import { SearchBar } from "@/components/ui/search-bar"
import { useSearchFilter } from "@/hooks/use-search-filter"
import ActivateUserAlert from "./activate-user-alert"

interface InactiveUser {
  userId: string
  enabled: number
  name: string
  surname1: string
  surname2: string
  email: string
  cellPhone: string
}

export default function InactiveUserTab() {
  const { unavailableUsers, isError, isLoading } = useGetUnavailableUsers()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const { filteredData: filteredUnavailableUsers, setSearchValue } = useSearchFilter<InactiveUser>({
    data: unavailableUsers || [],
    searchFields: ["userId", "name", "surname1", "surname2", "email", "cellPhone"],
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [filteredUnavailableUsers.length])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUnavailableUsers = filteredUnavailableUsers.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Usuarios Inactivos</h2>
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
          <h2 className="text-lg font-bold">Usuarios Inactivos</h2>
          <p className="text-muted-foreground">
            Aquí puedes gestionar los usuarios inactivos de tu aplicación.
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
              <TableCaption>Lista de usuarios inactivos</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Cédula</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Apellidos</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUnavailableUsers.length > 0 ? (
                  currentUnavailableUsers.map((user) => (
                    <TableRow key={user.userId}>
                      <TableCell>{user.userId}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{`${user.surname1} ${user.surname2}`}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.cellPhone}</TableCell>
                      <TableCell className="text-right">
                        <ActivateUserAlert data={user}>
                          <Button size={'sm'} variant={'outline'} className="flex items-center gap-2">
                            <UserPlus className="h-4 w-4" />
                            Activar
                          </Button>
                        </ActivateUserAlert>
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

          {filteredUnavailableUsers.length > itemsPerPage && (
            <PaginationController
              totalItems={filteredUnavailableUsers.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              siblingCount={1}
              className="mt-4"
            />
          )}
        </>
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
            <TableHead>Nombre</TableHead>
            <TableHead>Apellidos</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
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
                  <Skeleton className="h-4 w-48" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
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