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
      <Button variant="outline" size="icon" className="mr-2">
        <Pencil onClick={() => setIsEditModalOpen(true)} className="h-4 w-4" />
      </Button>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
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
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="budgetCodeId">Categoría de Estudio</Label>
                <Select
                  onValueChange={(value) => setValue('StudyCategoryId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría de estudio" />
                  </SelectTrigger>
                  <SelectContent>
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
                  <p className="text-red-500 text-xs">
                    {errors.StudyCategoryId.message}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Guardar Cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
