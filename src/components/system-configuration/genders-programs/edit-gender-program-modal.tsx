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
import usePatchGenderProgram from '@/hooks/system-configuration/gender-programs/commands/usePatchGenderProgram';
import { GenderProgram } from '@/types/system-configuration/Gender-programs/gender-programs';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

interface Props {
  genderProgram: GenderProgram;
}

export default function EditGenderProgramModal({
  genderProgram,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit, mutation } =
      usePatchGenderProgram({
      setIsOpen: setIsEditModalOpen,
      genderProgramId: genderProgram.id,
    });

  return (
    <>
      <Button variant="outline" size="icon" className="mr-2">
        <Pencil onClick={() => setIsEditModalOpen(true)} className="h-4 w-4" />
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
                    defaultValue={genderProgram.name}
                    className="col-span-3"
                    type="text"
                    {...register('name')}
                  />
                  {errors?.name && (
                    <span id="name-error" className="text-red-500 text-sm mt-2">
                      {errors.name.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Guardar cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
