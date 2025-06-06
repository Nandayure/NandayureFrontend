import useGetAllUsers from "@/hooks/user/queries/useGetAllUsers"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import { PaginationController } from "@/components/ui/pagination-controller"
import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, RefreshCw, UserX, MoreHorizontal } from "lucide-react"
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import useChangeUserStatus from "@/hooks/user/commands/useChangeUserStatus"

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
  const [userToDisable, setUserToDisable] = useState<{ id: string; name: string } | null>(null)
  const debouncedSearch = useDebounce(searchValue, 500)
  const itemsPerPage = 5

  const { allUsers, isError, isLoading, error, refetch } = useGetAllUsers({
    page: currentPage,
    limit: itemsPerPage,
    name: debouncedSearch || undefined,
    enabled: 1
  })

  const { mutation, isDialogOpen, setIsDialogOpen } = useChangeUserStatus({
    onSuccess: () => {
      setUserToDisable(null)
      refetch()
    }
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
  }, [debouncedSearch, currentPage, router, searchParams])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  const handleDisableUser = (userId: string, userName: string) => {
    setUserToDisable({ id: userId, name: userName })
    setIsDialogOpen(true)
  }

  const handleConfirmDisable = () => {
    if (userToDisable) {
      mutation.mutate({ id: userToDisable.id, status: false })
    }
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
                          {user.Roles.slice(0, 2).map((role) => (
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
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDisableUser(user.id, `${user.Employee.Name} ${user.Employee.Surname1}`)}
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100"
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Inhabilitar usuario</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
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

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar inhabilitación de usuario</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2">
                <div>¿Estás seguro que deseas inhabilitar al usuario <strong>{userToDisable?.name}</strong>?</div>
                <div className="text-muted-foreground">Esta acción:</div>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Inhabilitará el acceso del usuario al sistema</li>
                  <li>Mantendrá todos sus datos y registros históricos</li>
                  <li>Puede ser revertida posteriormente por un administrador</li>
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDisable}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              <UserX className="h-4 w-4 mr-2" />
              Inhabilitar usuario
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}