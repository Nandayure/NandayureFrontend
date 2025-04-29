"use client"

import type React from "react"

import { useState } from "react"
import { Edit, UserCog, Briefcase, Building, CalendarDays, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface JobInfoTabProps {
  employee: any
  onEditConfirmation: (employee: any) => void
  onJobPositionEdit: (employee: any) => void
}

export function JobInfoTab({ employee, onEditConfirmation, onJobPositionEdit }: JobInfoTabProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    HiringDate: employee.HiringDate,
    AvailableVacationDays: employee.AvailableVacationDays,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Información laboral editada:", formData)
    setIsEditing(false)
    // Aquí solo simulamos la edición
    onEditConfirmation(employee)
  }

  return (
    <div className="mt-4 space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Información Laboral</CardTitle>
            <CardDescription>Detalles sobre el puesto y departamento</CardDescription>
          </div>
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            <Edit className="mr-2 h-4 w-4" />
            {isEditing ? "Cancelar" : "Editar Información Laboral"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="HiringDate">Fecha de Contratación</Label>
                  <Input
                    id="HiringDate"
                    name="HiringDate"
                    type="date"
                    value={formData.HiringDate ? new Date(formData.HiringDate).toISOString().split("T")[0] : ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="AvailableVacationDays">Días de Vacaciones Disponibles</Label>
                  <Input
                    id="AvailableVacationDays"
                    name="AvailableVacationDays"
                    type="number"
                    min="0"
                    value={formData.AvailableVacationDays}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Guardar Cambios</Button>
              </div>
            </form>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Puesto</p>
                        <p className="font-medium">{employee.JobPosition.Name}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => onJobPositionEdit(employee)}>
                      <UserCog className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center">
                    <Building className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Departamento</p>
                      <p className="font-medium">{employee.JobPosition.Department.name}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <CalendarDays className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Fecha de Contratación</p>
                      <p className="font-medium">{formatDate(employee.HiringDate)}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Días de Vacaciones Disponibles</p>
                      <p className="font-medium">{employee.AvailableVacationDays} días</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Editar Puesto</h4>
                  <p className="text-sm text-muted-foreground">
                    Cambiar el puesto del empleado puede afectar a quién se envían las solicitudes de trámites
                  </p>
                </div>
                <Button variant="outline" onClick={() => onJobPositionEdit(employee)}>
                  <UserCog className="mr-2 h-4 w-4" />
                  Editar Puesto
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
