"use client"

import { useRolesManagement } from "@/hooks/roles/useRolesManagement"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Plus, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Role } from "@/types/roles/roles"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDebounce } from "@/hooks/use-debounce"
import { Input } from "@/components/ui/input"
import useGetAllUsers from "@/hooks/user/queries/useGetAllUsers"
import { PaginationController } from "@/components/ui/pagination-controller"

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

interface ConfirmationDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  trigger: React.ReactNode;
}

function ConfirmationDialog({ title, description, onConfirm, trigger }: ConfirmationDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function UserRoleManagement() {
  const { addRoleToUser, removeRoleFromUser, roles } = useRolesManagement()
  const [search, setSearch] = useState("")
  const [selectedRole, setSelectedRole] = useState<{ userId: string; roleId: number } | null>(null)
  const [selectKeys, setSelectKeys] = useState<{ [key: string]: number }>({})
  const [currentPage, setCurrentPage] = useState(1)
  const debouncedSearch = useDebounce(search, 500)
  const itemsPerPage = 5

  const { allUsers, isLoading, isError } = useGetAllUsers({
    page: currentPage,
    limit: itemsPerPage,
    name: debouncedSearch || undefined,
    enabled: 1
  })

  const handleAddRole = (userId: string, roleId: number) => {
    setSelectedRole({ userId, roleId })
  }

  const confirmAddRole = async () => {
    if (selectedRole) {
      await addRoleToUser(selectedRole.userId, selectedRole.roleId)
      // Incrementar la key para forzar un re-render del Select
      setSelectKeys(prev => ({
        ...prev,
        [selectedRole.userId]: (prev[selectedRole.userId] || 0) + 1
      }))
      setSelectedRole(null)
    }
  }

  const handleRemoveRole = async (userId: string, roleId: number) => {
    await removeRoleFromUser(userId, roleId)
    // Incrementar la key para forzar un re-render del Select
    setSelectKeys(prev => ({
      ...prev,
      [userId]: (prev[userId] || 0) + 1
    }))
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Error al cargar los usuarios.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Buscar usuarios..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />
      <div className="rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Puesto</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allUsers?.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {user.Employee.Name} {user.Employee.Surname1}
                </TableCell>
                <TableCell>{user.Employee.JobPosition.Name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {user.Roles.map((role) => (
                      <Badge
                        key={role.id}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {translateRole(role.RoleName)}
                        <ConfirmationDialog
                          title="Quitar rol"
                          description={`¿Está seguro que desea quitar el rol de ${translateRole(role.RoleName)} a este usuario?`}
                          onConfirm={() => handleRemoveRole(user.id, role.id)}
                          trigger={
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 hover:bg-transparent"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          }
                        />
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Select
                      key={selectKeys[user.id] || 0}
                      onValueChange={(value) => {
                        const roleId = Number(value)
                        handleAddRole(user.id, roleId)
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Agregar rol" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles?.filter(role =>
                          !user.Roles.some(userRole => userRole.id === role.id)
                        ).map((role) => (
                          <SelectItem key={role.id} value={role.id.toString()}>
                            {translateRole(role.RoleName)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {!isLoading && allUsers?.totalPages && allUsers.totalPages > 1 && (
        <PaginationController
          totalItems={allUsers.totalItems ?? 0}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          siblingCount={1}
          className="mt-4"
        />
      )}

      {/* Add Role Confirmation Dialog */}
      {selectedRole && (
        <AlertDialog open={!!selectedRole} onOpenChange={() => setSelectedRole(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Agregar rol</AlertDialogTitle>
              <AlertDialogDescription>
                ¿Está seguro que desea agregar este rol al usuario?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setSelectedRole(null)}>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={confirmAddRole}>Confirmar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}