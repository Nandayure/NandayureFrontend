'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetAllDepartments, usePatchJobPosition } from '@/hooks';
import { JobPosition } from '@/types';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

interface Props {
  jobPosition: JobPosition;
}

export default function EditJobPositionsModal({ jobPosition }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit, setValue, mutation } =
    usePatchJobPosition({
      setIsOpen: setIsEditModalOpen,
      jobPositionId: jobPosition.id,
    });

  const { departments } = useGetAllDepartments();

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setIsEditModalOpen(true)} className="mr-2"
        data-cy="btn-edit-job-position" >
        <Pencil className="h-4 w-4" />
      </Button>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent data-cy="modal-edit-job-position">
          <DialogHeader>
            <DialogTitle>Editar Puesto de trabajo</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  defaultValue={jobPosition.Name}
                  type="text"
                  {...register('Name')}
                  data-cy="input-edit-name-job-position"
                />
                {errors.Name && (
                  <p className="text-red-500 text-xs">{errors.Name.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  defaultValue={jobPosition.Description}
                  type="text"
                  {...register('Description')}
                  data-cy="input-edit-description-job-position"
                />
                {errors.Description && (
                  <p className="text-red-500 text-xs">
                    {errors.Description.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="DepartmentId">Departamento</Label>
                <Select
                  onValueChange={(value) =>
                    setValue('DepartmentId', Number(value))
                  }
                >
                  <SelectTrigger data-cy="select-edit-department-job-position">
                    <SelectValue placeholder="Seleccionar departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments &&
                      departments.map((department) => (
                        <SelectItem
                          key={department.id}
                          value={department.id.toString()}
                        >
                          {department.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.DepartmentId && (
                  <p className="text-red-500 text-xs">
                    {errors.DepartmentId.message}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" data-cy="btn-edit-submit-job-position">Guardar Cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
