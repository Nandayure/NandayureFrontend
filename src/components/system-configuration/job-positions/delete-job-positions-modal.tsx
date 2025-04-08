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
import ErrorModal from '@/components/ui/error-modal';
import { useDeleteJobPosition } from '@/hooks';
import { Trash2 } from 'lucide-react';

interface Props {
  id: number;
}

export default function DeleteJobPositionsModal({ id }: Props) {
  const {
    handleDelete,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    confirmDelete,
    errorMessage,
    closeErrorModal,
  } = useDeleteJobPosition({ jobPositionId: id });

  return (
    <>
      <Button data-cy="btn-delete-job-position" variant="outline" size="icon" onClick={() => handleDelete()}>
        <Trash2 className="h-4 w-4" />
      </Button>
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent data-cy="modal-delete-job-position">
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar este puesto de trabajo?.
              Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              data-cy="btn-delete-outline-job-position"
            >
              Cancelar
            </Button>
            <Button data-cy="btn-delete-confirm-job-position" variant="destructive" onClick={confirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {errorMessage && (
        <ErrorModal
          isOpen={!!errorMessage}
          onClose={closeErrorModal}
          message={errorMessage}
        />
      )}
    </>
  );
}
