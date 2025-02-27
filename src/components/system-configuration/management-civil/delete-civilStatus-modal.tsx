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
import { useDeleteCivilStatus } from '@/hooks';
import { Trash2 } from 'lucide-react';

interface Props {
  id: number;
}

export default function DeleteCivilStatusModal({ id }: Props) {
  const {
    handleDelete,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    confirmDelete,
    errorMessage,
    closeErrorModal,
    setErrorMessage,
  } = useDeleteCivilStatus({ civilStatusId: id });

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => handleDelete()} data-cy="btn-delete-civil-status">
        <Trash2 className="h-4 w-4" />
      </Button>
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar este estado civil? Esta
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
            <Button variant="destructive" onClick={confirmDelete} data-cy="btn-confirm-delete-civil-status">
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
