import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import usePatchDepartament from '@/hooks/system-configuration/departments/commands/usePatchDepartment';
import { Department } from '@/types';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

interface Props {
  departmend: Department;
}

export default function EditDepartmentForm({ departmend }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit, mutation } =
    usePatchDepartament({
      setIsOpen: setIsEditModalOpen,
      departmentId: departmend.id,
    });

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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="name"
                  defaultValue={departmend.name}
                  className="col-span-3"
                  type="text"
                  {...register('name')}
                />
                {errors?.name && (
                  <span id="name-error" className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Descripción
                </Label>
                <Input
                  id="description"
                  defaultValue={departmend.description}
                  className="col-span-3"
                  {...register('description')}
                />
                {errors?.description && (
                  <span id="description-error" className="text-red-500 text-sm">
                    {errors.description.message}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="departmentProgramId" className="text-right">
                  Programa
                </Label>
                <Input
                  id="departmentProgramId"
                  defaultValue={departmend.departmentProgramId}
                  className="col-span-3"
                  {...register('departmentProgramId')}
                />
                {errors?.departmentProgramId && (
                  <span
                    id="departmentProgramId-error"
                    className="text-red-500 text-sm"
                  >
                    {errors.departmentProgramId.message}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="budgetCodeId" className="text-right">
                  Código de presupuesto
                </Label>
                <Input
                  id="budgetCodeId"
                  defaultValue={departmend.budgetCodeId}
                  className="col-span-3"
                  {...register('budgetCodeId')}
                />
                {errors?.budgetCodeId && (
                  <span
                    id="budgetCodeId-error"
                    className="text-red-500 text-sm"
                  >
                    {errors.budgetCodeId.message}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="departmentHeadId" className="text-right">
                  Jefe de departamento
                </Label>
                <Input
                  id="departmentHeadId"
                  defaultValue={departmend.departmentHeadId}
                  className="col-span-3"
                  {...register('departmentHeadId')}
                />
                {errors?.departmentHeadId && (
                  <span
                    id="departmentHeadId-error"
                    className="text-red-500 text-sm"
                  >
                    {errors.departmentHeadId.message}
                  </span>
                )}
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
