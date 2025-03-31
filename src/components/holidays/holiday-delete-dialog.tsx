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
import { Trash2 } from "lucide-react"
import { useDeleteHoliday } from "@/hooks/holiday/commands/useDeleteHoliday"
import { Holiday } from "@/types"

interface HolidayDeleteDialogProps {
  holiday: Holiday
}

export function HolidayDeleteDialog({ holiday }: HolidayDeleteDialogProps) {
  const {
    isOpen,
    setIsOpen,
    onConfirmDelete,
    isPending
  } = useDeleteHoliday({ holiday })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] scale-in">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-4">
            <Trash2 className="h-6 w-6 text-destructive" />
          </div>
          <DialogTitle className="text-center text-xl">Eliminar Día Feriado</DialogTitle>
          <DialogDescription className="text-center">
            ¿Estás seguro de que deseas eliminar <span className="font-medium text-foreground">"{holiday.name}"</span>?
            Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-center sm:space-x-2 pt-4">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="mt-3 sm:mt-0 transition-all hover:bg-muted"
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirmDelete}
            disabled={isPending}
            className="relative overflow-hidden group transition-all hover:shadow-md active:scale-95"
          >
            <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></span>
            <span className="relative flex items-center justify-center gap-2">
              <Trash2 className="h-4 w-4" />
              {isPending ? "Eliminando..." : "Eliminar"}
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

