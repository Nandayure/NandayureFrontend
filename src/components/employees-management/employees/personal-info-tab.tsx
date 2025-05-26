"use client"

import type React from "react"

import { useState } from "react"
import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatDate } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Resolver, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UpdateEmployeeSchema } from "@/schemas"
import { UpdateEmployee } from "@/types"

interface PersonalInfoTabProps {
  employee: any
  onEditConfirmationAction: (employee: UpdateEmployee) => void
}

export function PersonalInfoTab({ employee, onEditConfirmationAction }: PersonalInfoTabProps) {
  const [isEditing, setIsEditing] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateEmployee>({
    resolver: zodResolver(UpdateEmployeeSchema) as Resolver<UpdateEmployee>,
    defaultValues: {
      Name: employee?.Name || "",
      Surname1: employee?.Surname1 || "",
      Surname2: employee?.Surname2 || "",
      Birthdate: employee?.Birthdate ? new Date(employee.Birthdate).toISOString().split("T")[0] : "",
      GenderId: employee?.Gender?.id,
      MaritalStatusId: employee?.MaritalStatus?.id,
      NumberChlidren: employee?.NumberChlidren || 0,
    },
  })

  const getInitials = (name: string = "", surname1: string = "") => {
    return `${name.charAt(0)}${surname1.charAt(0)}`
  }

  const handleSelectChangeAction = (name: keyof UpdateEmployee, value: string) => {
    setValue(name, Number(value))
  }

  const onSubmit = (data: UpdateEmployee) => {
    onEditConfirmationAction(data)
  }

  if (!employee) {
    return null
  }

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-xl">
              {getInitials(employee.Name || "", employee.Surname1 || "")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-2xl font-bold">
              {`${employee.Name?.trim() || ""} ${employee.Surname1?.trim() || ""} ${employee.Surname2 || ""}`}
            </h3>
            <p className="text-muted-foreground">ID: {employee.id}</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
          <Edit className="mr-2 h-4 w-4" />
          {isEditing ? "Cancelar" : "Editar Información Personal"}
        </Button>
      </div>

      <Separator />

      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="Name">Nombre</Label>
              <Input id="Name" {...register("Name")} />
              {errors.Name && <p className="text-sm text-red-500">{errors.Name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="Surname1">Primer Apellido</Label>
              <Input id="Surname1" {...register("Surname1")} />
              {errors.Surname1 && <p className="text-sm text-red-500">{errors.Surname1.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="Surname2">Segundo Apellido</Label>
              <Input id="Surname2" {...register("Surname2")} />
              {errors.Surname2 && <p className="text-sm text-red-500">{errors.Surname2.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="Birthdate">Fecha de Nacimiento</Label>
              <Input id="Birthdate" type="date" {...register("Birthdate")} />
              {errors.Birthdate && <p className="text-sm text-red-500">{errors.Birthdate.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="GenderId">Género</Label>
              <Select
                value={employee.Gender?.id?.toString()}
                onValueChange={(value) => handleSelectChangeAction("GenderId", value)}
              >
                <SelectTrigger id="GenderId" className="w-full">
                  <SelectValue placeholder="Seleccionar género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Masculino</SelectItem>
                  <SelectItem value="2">Femenino</SelectItem>
                  <SelectItem value="3">Otro</SelectItem>
                </SelectContent>
              </Select>
              {errors.GenderId && <p className="text-sm text-red-500">{errors.GenderId.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="MaritalStatusId">Estado Civil</Label>
              <Select
                value={employee.MaritalStatus?.id?.toString()}
                onValueChange={(value) => handleSelectChangeAction("MaritalStatusId", value)}
              >
                <SelectTrigger id="MaritalStatusId" className="w-full">
                  <SelectValue placeholder="Seleccionar estado civil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Soltero/a</SelectItem>
                  <SelectItem value="2">Casado/a</SelectItem>
                  <SelectItem value="3">Divorciado/a</SelectItem>
                  <SelectItem value="4">Viudo/a</SelectItem>
                </SelectContent>
              </Select>
              {errors.MaritalStatusId && <p className="text-sm text-red-500">{errors.MaritalStatusId.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="NumberChlidren">Número de Hijos</Label>
              <Input
                id="NumberChlidren"
                type="number"
                min="0"
                {...register("NumberChlidren", { valueAsNumber: true })}
              />
              {errors.NumberChlidren && <p className="text-sm text-red-500">{errors.NumberChlidren.message}</p>}
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
        <div className="w-full">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Información Personal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fecha de Nacimiento:</span>
                <span className="font-medium">{formatDate(employee.Birthdate) || "No especificado"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Género:</span>
                <span className="font-medium">{employee.Gender?.Name || "No especificado"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estado Civil:</span>
                <span className="font-medium">{employee.MaritalStatus?.Name || "No especificado"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Número de Hijos:</span>
                <span className="font-medium">{employee.NumberChlidren ?? 0}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
