'use client';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetAllStudiesCategory, usePatchStudy } from '@/hooks';
import { Study } from '@/types';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { StudiesCategoryItem } from './category-study-item';

interface Props {
  study: Study;
  studyId: number;
}

export default function EditStudyModal({ study, studyId }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit, mutation, setValue } =
    usePatchStudy({
      setIsOpen: setIsEditModalOpen,
      studyId,
    });
  const { studiesCategory } = useGetAllStudiesCategory();

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="mr-2"
        onClick={() => setIsEditModalOpen(true)}
        data-cy="btn-edit-study"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent data-cy="dialog-edit-study">
          <DialogHeader>
            <DialogTitle>Editar Departamento</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  defaultValue={study.name}
                  type="text"
                  {...register('name')}
                  data-cy="input-edit-name-study"
                />
                {errors.name && (
                  <p
                    className="text-red-500 text-xs"
                    data-cy="error-edit-name-study"
                  >
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="budgetCodeId">Categoría de Estudio</Label>
                <Select
                  onValueChange={(value) => setValue('StudyCategoryId', value)}
                >
                  <SelectTrigger data-cy="select-edit-study-category">
                    <SelectValue placeholder="Seleccionar categoría de estudio" />
                  </SelectTrigger>
                  <SelectContent data-cy="select-edit-content-study-category">
                    {studiesCategory &&
                      studiesCategory.map((category) => (
                        <StudiesCategoryItem
                          key={category.id}
                          category={category}
                        />
                      ))}
                  </SelectContent>
                </Select>
                {errors.StudyCategoryId && (
                  <p
                    className="text-red-500 text-xs"
                    data-cy="error-edit-study-category"
                  >
                    {errors.StudyCategoryId.message}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" data-cy="btn-submit-edit-study">
                Guardar Cambios
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
