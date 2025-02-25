'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import InputField from '@/components/ui/input-field';
import { usePostCivilStatus } from '@/hooks';
import { Plus } from 'lucide-react';

export default function AddCivilStatusModal() {
  const {
    register,
    onSubmit,
    handleSubmit,
    handleAddNew,
    isAddModalOpen,
    setIsAddModalOpen,
    errors,
  } = usePostCivilStatus();

  return (
    <>
      <Button onClick={handleAddNew} className="mb-4" data-cy="btn-add-civil-status">
        <Plus className="mr-2 h-4 w-4" /> Agregar Estado Civil
      </Button>
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Estado Civil</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <InputField
                id="Name"
                label="Nombre"
                type="text"
                register={register}
                errors={errors}
                dataCy='input-name-civil-status'
                errorDataCy='error-name-civil-status'
              />
              <InputField
                id="Description"
                label="Descripción"
                type="text"
                register={register}
                errors={errors}
                dataCy='input-description-civil-status'
                errorDataCy='error-description-civil-status'
              />

              {errors.root && (
                <p className="text-red-500 text-xs mt-2" data-cy="error-root-civil-status">
                  {' '}
                  {errors.root.message}{' '}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" data-cy="btn-submit-civil-status">Agregar Estado Civil</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}