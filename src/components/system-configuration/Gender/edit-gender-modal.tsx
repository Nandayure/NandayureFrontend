
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
import { usePatchGender } from '@/hooks';
import { Gender } from '@/types';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

interface Props {
  gender: Gender;
  genderId: number; 
}

export default function EditGenderModal({
  gender,
  genderId,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit, mutation } =
      usePatchGender({
      setIsOpen: setIsEditModalOpen,
      genderId: genderId,
    });

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setIsEditModalOpen(true)} className="mr-2"  data-cy="btn-edit-gender">
        <Pencil  className="h-4 w-4" />
      </Button>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Género</DialogTitle>
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
                    defaultValue={gender.Name}
                    className="col-span-3"
                    type="text"
                    {...register('Name')}
                    data-cy="input-edit-name-gender"
                  />
                  {errors?.Name && (
                    <span id="name-error" className="text-red-500 text-sm mt-2"  data-cy="error-edit-name-gender">
                      {errors.Name.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit"  data-cy="btn-submit-edit-gender">Guardar cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}