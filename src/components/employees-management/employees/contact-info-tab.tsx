"use client"

import type React from "react"

import { useState } from "react"
import { Edit, Mail, Phone, Heart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ContactInfoTabProps {
  employee: any
  onEditConfirmation: (employee: any) => void
}

export function ContactInfoTab({ employee, onEditConfirmation }: ContactInfoTabProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    Email: employee?.Email || "",
    CellPhone: employee?.CellPhone || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Información de contacto editada:", formData)
    setIsEditing(false)
    // Aquí solo simulamos la edición
    onEditConfirmation(employee)
  }

  if (!employee) {
    return null;
  }

  return (
    <div className="mt-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Información de Contacto</CardTitle>
            <CardDescription>Detalles de contacto del empleado</CardDescription>
          </div>
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            <Edit className="mr-2 h-4 w-4" />
            {isEditing ? "Cancelar" : "Editar Contacto"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="Email">Email</Label>
                  <Input id="Email" name="Email" type="email" value={formData.Email} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="CellPhone">Teléfono</Label>
                  <Input id="CellPhone" name="CellPhone" value={formData.CellPhone} onChange={handleChange} />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <p>{employee.Email || 'No especificado'}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Teléfono</h4>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <p>{employee.CellPhone || 'No especificado'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
