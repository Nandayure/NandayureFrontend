import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteDepartment } from '@/hooks';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
  id: number;
}

export default function DeleteDepartment({ id }: Props) {
  const { handleDelete, isDeleteModalOpen, setIsDeleteModalOpen, confirmDelete } = useDeleteDepartment({ departmentId: id });
  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleDelete(id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar este departamento? Esta
              acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
