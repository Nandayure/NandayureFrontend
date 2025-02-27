import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePatchCivilStatus } from '@/hooks';
import { CivilStatus } from '@/types';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

interface Props {
  CivilStatus: CivilStatus;
  civilStatusId: number;
}

export default function EditCivilStatusModal({
  CivilStatus,
  civilStatusId,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit, mutation } =
    usePatchCivilStatus({
      setIsOpen: setIsEditModalOpen,
      civilStatusId: civilStatusId,
    });

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setIsEditModalOpen(true)} className="mr-2" data-cy="btn-edit-civil-status">
        <Pencil className="h-4 w-4" />
      </Button>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Estado Civil</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <div className="col-span-3 flex flex-col">
                  <Input
                    id="name"
                    defaultValue={CivilStatus.Name}
                    data-cy="input-edit-name-civil-status"
                    className="col-span-3"
                    type="text"
                    {...register('Name')}
                  />
                  {errors?.Name && (
                    <span id="name-error" className="text-red-500 text-sm mt-2" data-cy="error-edit-name-civil-status">
                      {errors.Name.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Descripción
                </Label>
                <div className="col-span-3 flex flex-col">
                  <Input
                    id="description"
                    defaultValue={CivilStatus.Description}
                    data-cy="input-edit-description-civil-status"
                    className="col-span-3"
                    {...register('Description')}
                  />
                  {errors?.Description && (
                    <span id="description-error" className="text-red-500 text-sm mt-2" data-cy="error-edit-description-civil-status">
                      {errors.Description.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" data-cy="btn-submit-edit-civil-status"
              >Guardar cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}