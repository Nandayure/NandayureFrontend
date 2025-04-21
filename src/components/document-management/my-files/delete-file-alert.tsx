'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useDeleteFile } from "@/hooks/files/useDeleteFile";
import { FileItem } from "@/types";

interface Props {
  children: React.ReactNode
  file: FileItem
  folderId?: string
  onDeleteSuccess?: () => void
}

export default function DeleteFile({ children, file, folderId, onDeleteSuccess }: Props) {
  const {
    isOpen,
    setIsOpen,
    onConfirmDelete,
    isPending,
    isError,
    error
  } = useDeleteFile({ file, folderId, onDeleteSuccess });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-destructive">
            Eliminar archivo
          </DialogTitle>
          <DialogDescription>
            ¿Estás seguro que deseas eliminar el archivo &quot;{file.name}&quot;?
            Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>

        <div className="py-3">
          {isError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                {error instanceof Error
                  ? error.message
                  : 'Ha ocurrido un error al eliminar el archivo'}
              </AlertDescription>
            </Alert>
          )}

          <p className="text-sm text-muted-foreground">
            Al eliminar este archivo, ya no estará disponible para su visualización o descarga.
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