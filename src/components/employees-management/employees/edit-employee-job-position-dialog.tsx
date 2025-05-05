"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useGetAllJobPositions, useUpdateEmployeeJobPosition } from "@/hooks"
import { useState } from "react"

interface EditEmployeeJobPositionDialogProps {
  isOpen: boolean
  onClose: () => void
  employee: any
  onConfirm: () => void
}

export function EditEmployeeJobPositionDialog({
  isOpen,
  onClose,
  employee,
  onConfirm
}: EditEmployeeJobPositionDialogProps) {
  const { onSubmit } = useUpdateEmployeeJobPosition({
    employeeId: employee.id,
    setIsOpen: onClose,
  })

  const { jobPositions } = useGetAllJobPositions()
  const [selectedJobPosition, setSelectedJobPosition] = useState<string>(
    employee?.JobPosition?.id?.toString() || ""
  )

  const handleJobPositionChange = (value: string) => {
    setSelectedJobPosition(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedJobPosition) return

    await onSubmit({
      JobPositionId: Number(selectedJobPosition)
    })
    onConfirm()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cambiar Puesto de Trabajo</DialogTitle>
          <DialogDescription>
            Selecciona el nuevo puesto de trabajo para {employee?.Name} {employee?.Surname1}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Puesto de Trabajo</Label>
              <Select
                value={selectedJobPosition}
                onValueChange={handleJobPositionChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar puesto" />
                </SelectTrigger>
                <SelectContent>
                  {jobPositions?.map((position) => (
                    <SelectItem
                      key={position.id}
                      value={position.id.toString()}
                    >
                      {position.Name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Guardar Cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}