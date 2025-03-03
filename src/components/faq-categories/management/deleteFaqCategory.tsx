'use client'

import { FaqCategory } from "@/types"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useDeleteFaqCategory } from "@/hooks/faq-categories/commands/useDeleteFaqCategory";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Props {
  children: React.ReactNode
  faqCategory: FaqCategory
}

export default function DeleteFaqCategory({ children, faqCategory }: Props) {
  const {
    isOpen,
    setIsOpen,
    onConfirmDelete,
    isPending,
    isError,
    error
  } = useDeleteFaqCategory({ faqCategory });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-destructive">
            Eliminar categoría
          </DialogTitle>
          <DialogDescription>
            ¿Estás seguro que deseas eliminar la categoría &quot;{faqCategory.name}&quot;?
            Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>

        <div className="py-3">
          {isError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                {error instanceof Error
                  ? error.message
                  : 'Ha ocurrido un error al eliminar la categoría'}
              </AlertDescription>
            </Alert>
          )}

          <p className="text-sm text-muted-foreground">
            Al eliminar esta categoría, todas las preguntas asociadas a ella
            dejarán de estar categorizadas.
          </p>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              disabled={isPending}
              className="mt-2 sm:mt-0"
              type="button"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={onConfirmDelete}
          >
            {isPending ? (
              <>
                <Loader2Icon size={16} className="mr-2 animate-spin" />
                <span>Eliminando...</span>
              </>
            ) : (
              <>
                <Trash2Icon size={16} className="mr-2" />
                <span>Eliminar</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}