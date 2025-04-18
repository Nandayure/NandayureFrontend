"use client"

import { useState } from "react"
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
import { useChangeUserStatus } from "@/hooks/user/commands/useChangeUserStatus"

interface DisableUserAlertProps {
  children?: React.ReactNode
  data: {
    userId: string
    enabled: number
    name: string
    surname1: string
    surname2: string
    email: string
    cellPhone: string
  }
}

export default function DisableUserAlert({ data, children }: DisableUserAlertProps) {
  const { mutation, isDialogOpen, setIsDialogOpen } = useChangeUserStatus()

  const handleDisableUser = () => {
    mutation.mutate({
      id: data.userId,
      status: false
    })
  }

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Está seguro de desactivar este usuario?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción desactivará el acceso del usuario al sistema. Los datos se mantendrán almacenados pero el usuario no podrá iniciar sesión.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDisableUser}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Desactivar Usuario
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
