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

interface ActivateUserAlertProps {
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

export default function ActivateUserAlert({ data, children }: ActivateUserAlertProps) {
  const { mutation, isDialogOpen, setIsDialogOpen } = useChangeUserStatus()

  const handleActivateUser = () => {
    mutation.mutate({
      id: data.userId,
      status: true
    })
  }

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Está seguro de activar este usuario?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción restaurará el acceso del usuario al sistema. El usuario podrá volver a iniciar sesión.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleActivateUser}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Activar Usuario
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}