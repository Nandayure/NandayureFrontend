"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useGetAllDepartments, useGetAllJobPositions } from "@/hooks"
import { useUpdateEmployeeJobPosition } from "@/hooks"
import { useState } from "react"
import { Employee } from "@/types"

interface EditEmployeeJobPositionDialogProps {
  isOpen: boolean
  onCloseAction: () => void
  employee: Employee
  onConfirmAction: () => void
}

export function EditEmployeeJobPositionDialog({
  isOpen,
  onCloseAction,
  employee,
  onConfirmAction,
}: EditEmployeeJobPositionDialogProps) {
  const [selectedJobPositionId, setSelectedJobPositionId] = useState<string>(
    employee?.JobPosition?.id?.toString() || ""
  )
  const { departments = [], isLoading: isDepartmentsLoading } = useGetAllDepartments()
  const { jobPositions = [], isLoading: isJobPositionsLoading } = useGetAllJobPositions()

  const { onSubmit: updateJobPosition, mutation } = useUpdateEmployeeJobPosition({
    employeeId: employee?.id,
    setIsOpen: onCloseAction,
  })

  const handleSubmitAction = async () => {
    if (selectedJobPositionId) {
      await updateJobPosition({ JobPositionId: Number(selectedJobPositionId) })
      onConfirmAction()
      onCloseAction()
    }
  }

  const isLoading = isDepartmentsLoading || isJobPositionsLoading || mutation.isPending

  return (
    <Dialog open={isOpen} onOpenChange={onCloseAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cambiar Puesto de Trabajo</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Puesto Actual</Label>
            <div className="text-sm text-muted-foreground">
              {employee?.JobPosition?.Name || "No especificado"} -{" "}
              {employee?.JobPosition?.Department?.name || "Departamento no especificado"}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobPosition">Nuevo Puesto</Label>
            <Select value={selectedJobPositionId} onValueChange={setSelectedJobPositionId}>
              <SelectTrigger id="jobPosition">
                <SelectValue placeholder="Seleccionar nuevo puesto" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <div key={department.id}>
                    <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                      {department.name}
                    </div>
                    {jobPositions
                      .filter((position) => position.DepartmentId === department.id)
                      .map((position) => (
                        <SelectItem key={position.id} value={position.id.toString()}>
                          {position.Name}
                        </SelectItem>
                      ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCloseAction}>
            Cancelar
          </Button>
          <Button onClick={handleSubmitAction} disabled={!selectedJobPositionId || isLoading}>
            Guardar Cambios
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}