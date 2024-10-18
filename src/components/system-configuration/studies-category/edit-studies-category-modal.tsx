import { usePatchStudiesCategory } from '@/hooks';
import { StudiesCategory } from '@/types';
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
import { Pencil } from 'lucide-react';
import { useState } from 'react';
interface Props {
  studiesCategory: StudiesCategory;
}

export default function EditStudiesCategoryModal({ studiesCategory }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit, mutation } =
    usePatchStudiesCategory({
      setIsOpen: setIsEditModalOpen,
      studiesCategoryId: studiesCategory.id,
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
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  defaultValue={studiesCategory.description}
                  {...register('description')}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="weight">Peso</Label>
                <Input
                  id="weight"
                  defaultValue={studiesCategory.weight}
                  {...register('weight')}
                />
                {errors.weight && (
                  <p className="text-red-500 text-xs">
                    {errors.weight.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Dedication">Dedicación</Label>
                <Input
                  id="Dedication"
                  defaultValue={studiesCategory.Dedication}
                  {...register('Dedication')}
                />
                {errors.Dedication && (
                  <p className="text-red-500 text-xs">
                    {errors.Dedication.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Restriction">Restricción</Label>
                <Input
                  id="Restriction"
                  defaultValue={studiesCategory.Restriction}
                  {...register('Restriction')}
                />
                {errors.Restriction && (
                  <p className="text-red-500 text-xs">
                    {errors.Restriction.message}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Guardar cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
