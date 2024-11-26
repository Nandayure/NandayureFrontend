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
import { usePatchStudiesCategory } from '@/hooks';
import { StudiesCategory } from '@/types';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

interface Props {
  categoryStudies: StudiesCategory;
}

export interface PatchStudiesCategory {
  id?: string;
  description?: string;
  weight?: number;
  Dedication?: number;
  Restriction?: number;
}

export default function EditStudiesCategoryModal({ categoryStudies }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit, mutation } =
    usePatchStudiesCategory({
      setIsOpen: setIsEditModalOpen,
      studiesCategoryId: categoryStudies.id,
    });

  return (
    <>
      <Button variant="outline" size="icon" className="mr-2">
        <Pencil onClick={() => setIsEditModalOpen(true)} className="h-4 w-4" />
      </Button>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Categoría de Estudio</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  Id
                </Label>
                <div className="col-span-3 flex flex-col">
                  <Input
                    id="id"
                    defaultValue={categoryStudies.id}
                    className="col-span-3"
                    type="text"
                    {...register('id')}
                  />
                  {errors?.id && (
                    <span id="id-error" className="text-red-500 text-sm mt-2">
                      {errors.id.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <div className="col-span-3 flex flex-col">
                  <Input
                    id="name"
                    defaultValue={categoryStudies.description}
                    className="col-span-3"
                    type="text"
                    {...register('description')}
                  />
                  {errors?.description && (
                    <span id="name-error" className="text-red-500 text-sm mt-2">
                      {errors.description.message}
                    </span>
                  )}
                </div>
                <Label htmlFor="weight" className="text-right">
                  Peso
                </Label>
                <div className="col-span-3 flex flex-col">
                  <Input
                    id="weight"
                    defaultValue={categoryStudies.weight}
                    className="col-span-3"
                    type="text"
                    {...register('weight')}
                  />
                  {errors?.weight && (
                    <span
                      id="weight-error"
                      className="text-red-500 text-sm mt-2"
                    >
                      {errors.weight.message}
                    </span>
                  )}
                </div>
                <Label htmlFor="Dedication" className="text-right">
                  Dedicación
                </Label>
                <div className="col-span-3 flex flex-col">
                  <Input
                    id="Dedication"
                    defaultValue={categoryStudies.Dedication}
                    className="col-span-3"
                    type="text"
                    {...register('Dedication')}
                  />
                  {errors?.Dedication && (
                    <span
                      id="Dedication-error"
                      className="text-red-500 text-sm mt-2"
                    >
                      {errors.Dedication.message}
                    </span>
                  )}
                </div>
                <Label htmlFor="Restriction" className="text-right">
                  Restricción
                </Label>
                <div className="col-span-3 flex flex-col">
                  <Input
                    id="Restriction"
                    defaultValue={categoryStudies.Restriction}
                    className="col-span-3"
                    type="text"
                    {...register('Restriction')}
                  />
                  {errors?.Restriction && (
                    <span
                      id="Restriction-error"
                      className="text-red-500 text-sm mt-2"
                    >
                      {errors.Restriction.message}
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
