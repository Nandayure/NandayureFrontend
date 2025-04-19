import useGetAllUsers from "@/hooks/user/queries/useGetAllUsers"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import { PaginationController } from "@/components/ui/pagination-controller"
import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, RefreshCw, MoreHorizontal } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks/use-debounce"
import { UserSearchBar } from "./user-search-bar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const getRoleBadgeStyle = (role: string) => {
  const styles: { [key: string]: string } = {
    'TI': 'bg-blue-500 text-white hover:bg-blue-600',
    'USER': 'bg-gray-500 text-white hover:bg-gray-600',
    'VA': 'bg-green-500 text-white hover:bg-green-600',
    'RH': 'bg-purple-500 text-white hover:bg-purple-600',
    'DEPARTMENT_HEAD': 'bg-orange-500 text-white hover:bg-orange-600',
  }
  return styles[role] || 'bg-gray-500 text-white hover:bg-gray-600'
}

const translateRole = (role: string) => {
  const translations: { [key: string]: string } = {
    'TI': 'Administrador',
    'USER': 'Usuario',
    'VA': 'Alcalde',
    'RH': 'Recursos Humanos',
    'DEPARTMENT_HEAD': 'Jefe de Departamento',
  }
  return translations[role] || role
}

export const ActiveUserTab = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1)
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || "")
  const debouncedSearch = useDebounce(searchValue, 500)
  const itemsPerPage = 5

  const { allUsers, isError, isLoading, error, refetch } = useGetAllUsers({
    page: currentPage,
    limit: itemsPerPage,
    name: debouncedSearch || undefined,
    enabled: 1
  })

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
            {Array.from({ length: 5 }).map((_, index) => (
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
        <AlertTitle>Error al cargar usuarios</AlertTitle>
        <AlertDescription>
          <div className="flex flex-col space-y-2">
            <p>{error instanceof Error ? error.message : 'Ha ocurrido un error al cargar los usuarios'}</p>
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
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Usuarios Activos</h1>
        <p className="text-gray-500">Lista de usuarios activos en el sistema.</p>
      </div>

      <div className="flex items-center justify-end gap-4">
        <UserSearchBar onSearch={handleSearch} value={searchValue} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Puesto</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead className="w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allUsers?.data?.length ? (
            allUsers.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {`${user.Employee.Name} ${user.Employee.Surname1} ${user.Employee.Surname2}`}
                </TableCell>
                <TableCell>{user.Employee.Email}</TableCell>
                <TableCell>{user.Employee.JobPosition.Name}</TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="flex items-center gap-2">
                          {user.Roles.slice(0, 2).map((role, index) => (
                            <Badge
                              key={role.id}
                              className={getRoleBadgeStyle(role.RoleName)}
                            >
                              {translateRole(role.RoleName)}
                            </Badge>
                          ))}
                          {user.Roles.length > 2 && (
                            <Badge variant="outline">
                              +{user.Roles.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="flex flex-col gap-1">
                          {user.Roles.map((role) => (
                            <span key={role.id}>{translateRole(role.RoleName)}</span>
                          ))}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                No hay usuarios disponibles
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {allUsers && allUsers.totalPages > 1 && (
        <PaginationController
          totalItems={allUsers.totalItems}
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