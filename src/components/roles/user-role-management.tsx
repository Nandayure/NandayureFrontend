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
import { useSearchFilter } from "@/hooks/use-search-filter"
import { Input } from "@/components/ui/input"
import useGetAllUsers from "@/hooks/user/queries/useGetAllUsers"

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

export function UserRoleManagement() {
  const { addRoleToUser, removeRoleFromUser, roles } = useRolesManagement()
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 500)
  const itemsPerPage = 5

  const { allUsers, isLoading, isError } = useGetAllUsers({
    page: 1,
    limit: itemsPerPage,
    name: debouncedSearch || undefined,
    enabled: 1
  })

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
      <div className="rounded-md border">
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
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 hover:bg-transparent"
                          onClick={() => removeRoleFromUser(Number(user.id), role.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Select
                      onValueChange={(value) => {
                        const roleId = Number(value)
                        addRoleToUser(Number(user.id), roleId)
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
    </div>
  )
}