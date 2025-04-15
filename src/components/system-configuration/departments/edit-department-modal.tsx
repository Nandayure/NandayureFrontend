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
import {
  useGetAllDepartmentPrograms,
  useGetAllEmployees,
  usePatchDepartament,
} from '@/hooks';
import { Department } from '@/types';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { BudgetCodeItem } from './budget-code-item';

interface Props {
  department: Department;
  departmentId: number;
}

export default function EditDepartmentModal({
  department,
  departmentId,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit, mutation, setValue } =
    usePatchDepartament({
      setIsOpen: setIsEditModalOpen,
      departmentId: departmentId,
    });
  const { employees } = useGetAllEmployees();
  const { departmentPrograms } = useGetAllDepartmentPrograms();

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
                  defaultValue={department.name}
                  id="name"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  defaultValue={department.description}
                  id="description"
                  {...register('description')}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="departmentProgramId">Programa</Label>
                <Select
                  onValueChange={(value) =>
                    setValue('departmentProgramId', Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar programa" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentPrograms &&
                      departmentPrograms.map((program) => (
                        <SelectItem
                          key={program.id}
                          value={program.id.toString()}
                        >
                          {program.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.departmentProgramId && (
                  <p className="text-red-500 text-xs">
                    {errors.departmentProgramId.message}
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
