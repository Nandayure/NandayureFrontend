'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteGender } from '@/hooks';
import { Trash2 } from 'lucide-react';

interface Props {
  id: number;
}

export default function DeleteGenderModal({ id }: Props) {
  const {
    handleDelete,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    confirmDelete,
  } = useDeleteGender({ genderId: id });

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => handleDelete()}>
        <Trash2 className="h-4 w-4" />
      </Button>
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar este género?. Esta acción no se puede deshacer.
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
