"use client"

import { useState, useEffect } from "react"
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
import { Employee } from "@/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DeleteUserAlertProps {
  employee: Employee
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteUserAlert({ employee, onClose, onConfirm }: DeleteUserAlertProps) {
  const [idInput, setIdInput] = useState("")
  const [isMatch, setIsMatch] = useState(false)

  // Verificar si coincide la cédula ingresada
  useEffect(() => {
    setIsMatch(idInput === employee.id)
  }, [idInput, employee.id])

  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Estás a punto de eliminar al usuario{" "}
            <span className="font-semibold">
              {employee.Name} {employee.Surname1} {employee.Surname2}
            </span>
            . Esta acción no se puede deshacer.
          </AlertDialogDescription>
          <AlertDialogDescription className="mt-2">
            Para confirmar, por favor ingresa la cédula del usuario: <span className="font-bold">{employee.id}</span>
          </AlertDialogDescription>
          <div className="mt-4">
            <Label htmlFor="confirm-id">Cédula de confirmación</Label>
            <Input
              id="confirm-id"
              type="text"
              value={idInput}
              onChange={(e) => setIdInput(e.target.value)}
              placeholder="Ingresa la cédula para confirmar"
              className="mt-1"
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={!isMatch}
            className={`bg-red-600 hover:bg-red-700 text-white ${!isMatch ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
