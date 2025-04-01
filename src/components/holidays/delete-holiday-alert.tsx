"use client"

import type { Holiday } from "@/types"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useDeleteHoliday } from "@/hooks/holiday/commands/useDeleteHoliday"

interface DeleteHolidayAlertProps {
  holiday: Holiday
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function DeleteHolidayAlert({ holiday, isOpen, setIsOpen }: DeleteHolidayAlertProps) {
  const { onConfirmDelete, isPending } = useDeleteHoliday({
    holiday,
  })

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción eliminará permanentemente el feriado &quot;{holiday.name}&quot; y no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <Button variant="destructive" onClick={onConfirmDelete} disabled={isPending} className="gap-2">
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Eliminar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

