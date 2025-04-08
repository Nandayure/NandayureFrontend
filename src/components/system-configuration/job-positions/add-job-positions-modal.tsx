'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { useGetAllDepartments, usePostJobPosition } from '@/hooks';

export default function AddJobPositionsModal() {
  const {
    register,
    onSubmit,
    handleSubmit,
    handleAddNew,
    isAddModalOpen,
    setIsAddModalOpen,
    setValue,
    errors,
  } = usePostJobPosition();
  const { departments } = useGetAllDepartments();

  return (
    <>
      <Button onClick={handleAddNew} data-cy="btn-add-job-position">
        <Plus className="mr-2 h-4 w-4" /> Agregar Puesto de trabajo
      </Button>
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent  data-cy="modal-add-job-position">
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Puesto de trabajo</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" {...register('Name')} data-cy="input-name-add-job-position"/>
                {errors.Name && (
                  <p className="text-red-500 text-xs">{errors.Name.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Input id="description" {...register('Description')} data-cy="input-add-description-job-position"/>
                {errors.Description && (
                  <p className="text-red-500 text-xs">
                    {errors.Description.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="baseSalary">Salario base</Label>
                <Input id="baseSalary" {...register('baseSalary')}
                data-cy="input-add-salarioBase-job-position" />
                {errors.baseSalary && (
                  <p className="text-red-500 text-xs">
                    {errors.baseSalary.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="globalSalary">Salario global</Label>
                <Input id="globalSalary" {...register('globalSalary')} data-cy="input-add-SalarioGlobal-job-position"/>
                {errors.globalSalary && (
                  <p className="text-red-500 text-xs">
                    {errors.globalSalary.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="extrafees">Salario extra</Label>
                <Input id="extrafees" {...register('extrafees')} data-cy="input-add-salarioExtra-job-position"/>
                {errors.extrafees && (
                  <p className="text-red-500 text-xs">
                    {errors.extrafees.message}
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
                  <SelectTrigger data-cy="select-department-job-position">
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
              <Button type="submit" data-cy="btn-submit-add-job-position">Agregar puesto de trabajo</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
