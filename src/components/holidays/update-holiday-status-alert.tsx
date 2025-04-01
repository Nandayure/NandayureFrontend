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
import { useUpdateHolidayStatus } from "@/hooks/holiday/commands/useUpdateHolidayStatus"

interface UpdateHolidayStatusAlertProps {
  holiday: Holiday
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function UpdateHolidayStatusAlert({ holiday, isOpen, setIsOpen }: UpdateHolidayStatusAlertProps) {
  const { toggleStatus, isPending } = useUpdateHolidayStatus({
    holiday,
  })

  const handleConfirm = () => {
    toggleStatus()
    setIsOpen(false)
  }

  const actionText = holiday.isActive ? "desactivar" : "activar"
  const actionTextCapitalized = holiday.isActive ? "Desactivar" : "Activar"

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿{actionTextCapitalized} este feriado?</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro que deseas {actionText} el feriado &quot;{holiday.name}&quot;?
            {holiday.isActive
              ? " Los feriados desactivados no serán considerados en los cálculos."
              : " Los feriados activos serán considerados en los cálculos."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <Button
            variant={holiday.isActive ? "destructive" : "default"}
            onClick={handleConfirm}
            disabled={isPending}
            className="gap-2"
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {actionTextCapitalized}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

