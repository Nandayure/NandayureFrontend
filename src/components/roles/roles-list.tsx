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
import { Role } from "@/types/roles/roles"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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

export function RolesList() {
  const { roles, isLoadingRoles, isRolesError } = useRolesManagement()

  if (isLoadingRoles) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  if (isRolesError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Error al cargar los roles del sistema.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles?.map((role: Role) => (
            <TableRow key={role.id}>
              <TableCell className="font-medium">
                {translateRole(role.RoleName)}
              </TableCell>
              <TableCell>{role.Description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}