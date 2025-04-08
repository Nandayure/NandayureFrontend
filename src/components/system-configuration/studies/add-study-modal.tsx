'use client';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetAllStudiesCategory, usePostStudy } from '@/hooks';
import { StudiesCategoryItem } from './category-study-item';

export default function AddStudyModal() {
  const {
    register,
    onSubmit,
    handleSubmit,
    handleAddNew,
    isAddModalOpen,
    setIsAddModalOpen,
    setValue,
    errors,
  } = usePostStudy();
  const { studiesCategory } = useGetAllStudiesCategory();

  return (
    <>
      <Button onClick={handleAddNew} data-cy="btn-add-study">
        <Plus className="mr-2 h-4 w-4" /> Agregar estudio
      </Button>
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar nuevo estudio</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="Escribe el nombre del estudio aquí"
                  data-cy="input-add-name-study"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs" data-cy="error-name-study">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="budgetCodeId">Categoría de Estudio</Label>
                <Select
                  onValueChange={(value) =>
                    setValue('StudyCategoryId', value)
                  }
                >
                  <SelectTrigger data-cy="select-study-category">
                    <SelectValue placeholder="Seleccionar categoría de estudio" />
                  </SelectTrigger>
                  <SelectContent data-cy="select-content-study-category">
                    {studiesCategory &&
                      studiesCategory.map((category) => (
                        <StudiesCategoryItem key={category.id} category={category} />
                      ))}
                  </SelectContent>
                </Select>
                {errors.StudyCategoryId && (
                  <p className="text-red-500 text-xs" data-cy="error-study-category">
                    {errors.StudyCategoryId.message}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" data-cy="btn-submit-add-study">
                Agregar estudio
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
