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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Employee } from "@/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRestoreEmployee } from "@/hooks/system-configuration/employees/commands/useRestoreEmployee"

interface RestoreUserAlertProps {
  children?: React.ReactNode
  employee: Employee
}

export default function RestoreUserAlert({ employee, children }: RestoreUserAlertProps) {
  const [idInput, setIdInput] = useState("")
  const [isMatch, setIsMatch] = useState(false)
  const {
    isOpen,
    setIsOpen,
    onConfirmRestore,
    isPending,
    isError,
    error
  } = useRestoreEmployee({ employee })

  useEffect(() => {
    setIsMatch(idInput === employee.id)
  }, [idInput, employee.id])

  const onClose = () => setIsOpen(false)
  const onConfirm = () => {
    if (isMatch) {
      onConfirmRestore()
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Estás a punto de restaurar al usuario{" "}
            <span className="font-semibold">
              {employee.Name} {employee.Surname1} {employee.Surname2}
            </span>
            . Esta acción restaurará todos los permisos y acceso del usuario.
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
            className={`bg-green-600 hover:bg-green-700 text-white ${!isMatch ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Restaurar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 