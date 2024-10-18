import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { usePostStudiesCategory } from '@/hooks';

export default function AddStudiesCategoryModal() {
  const {
    register,
    onSubmit,
    handleSubmit,
    handleAddNew,
    isAddModalOpen,
    setIsAddModalOpen,
    errors,
  } = usePostStudiesCategory();

  return (
    <>
      <Button onClick={handleAddNew} className="mb-4">
        <Plus className="mr-2 h-4 w-4" /> Agregar Categoría de Estudio
      </Button>
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nueva Categoría de Estudio</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Input id="description" {...register('description')} />
                {errors.description && (
                  <p className="text-red-500 text-xs">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="weight">Peso</Label>
                <Input id="weight" {...register('weight')} />
                {errors.weight && (
                  <p className="text-red-500 text-xs">
                    {errors.weight.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Dedication">Dedicación</Label>
                <Input id="Dedication" {...register('Dedication')} />
                {errors.Dedication && (
                  <p className="text-red-500 text-xs">
                    {errors.Dedication.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Restriction">Restricción</Label>
                <Input id="Restriction" {...register('Restriction')} />
                {errors.Restriction && (
                  <p className="text-red-500 text-xs">
                    {errors.Restriction.message}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                Agregar Categoría de Estudio
                </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
