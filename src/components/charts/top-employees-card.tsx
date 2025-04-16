"use client"

import { useEmployeesWithMostRequests } from "@/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { UserIcon } from "lucide-react"
import { EmployeesWithMostRequestsQuery } from "@/types"

interface TopEmployeesCardProps {
  query: EmployeesWithMostRequestsQuery
}

export function TopEmployeesCard({ query }: TopEmployeesCardProps) {
  const { employeesWithMostRequests, isLoading, isError } = useEmployeesWithMostRequests(query)

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Empleados con más solicitudes</CardTitle>
          <CardDescription>Los empleados con más solicitudes en el período seleccionado</CardDescription>
        </CardHeader>
        <CardContent>
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="mb-4 flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-5 w-3/4 mb-1" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  if (isError || !employeesWithMostRequests || employeesWithMostRequests.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Empleados con más solicitudes</CardTitle>
          <CardDescription>Los empleados con más solicitudes en el período seleccionado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground">No hay datos disponibles para el período seleccionado</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Empleados con más solicitudes</CardTitle>
        <CardDescription>Los empleados con más solicitudes en el período seleccionado</CardDescription>
      </CardHeader>
      <CardContent>
        {employeesWithMostRequests.map((employee, index) => (
          <div
            key={employee.employeeId}
            className="mb-4 flex items-center justify-between gap-3 rounded-md p-2 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <UserIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">
                  {employee.name} {employee.surname1} {employee.surname2}
                </p>
                <p className="text-sm text-muted-foreground">ID: {employee.employeeId}</p>
              </div>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-dodger-blue-500">
              <span className="text-xs font-medium text-primary-foreground">{employee.totalRequests}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}