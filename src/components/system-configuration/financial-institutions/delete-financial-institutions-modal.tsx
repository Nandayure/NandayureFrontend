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
import { useDeleteFinancialInstitution } from '@/hooks';
import { Trash2 } from 'lucide-react';

interface Props {
  id: number;
}

export default function DeleteFinancialInstitutionsModal({ id }: Props) {
  const {
    handleDelete,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    confirmDelete,
    errorMessage,
    closeErrorModal,
  } = useDeleteFinancialInstitution({ financialInstitutionId: id });

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
              ¿Estás seguro de que quieres eliminar este institución
              financiera?. Esta acción no se puede deshacer.
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
