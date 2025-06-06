import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  usePostDepartment,
} from '@/hooks';
import { Plus } from 'lucide-react';
import { BudgetCodeItem } from './budget-code-item';
import { Input } from '@/components/ui/input';

export default function AddDepartmentModal() {
  const {
    register,
    onSubmit,
    handleSubmit,
    handleAddNew,
    isAddModalOpen,
    setIsAddModalOpen,
    errors,
    setValue,
  } = usePostDepartment();
  const { employees } = useGetAllEmployees();
  const { departmentPrograms } = useGetAllDepartmentPrograms();
  return (
    <>
      <Button onClick={handleAddNew}>
        <Plus className="mr-2 h-4 w-4" /> Agregar Departamento
      </Button>
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Departamento</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" {...register('name')} />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Input id="description" {...register('description')} />
                {errors.description && (
                  <p className="text-red-500 text-xs">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2 w-full">
                <Label htmlFor="departmentProgramId">Programa</Label>
                <Select
                  onValueChange={(value) =>
                    setValue('departmentProgramId', Number(value))
                  }
                >
                  <SelectTrigger className="w-full">
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
              {errors.root && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.root.message}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button type="submit">Agregar Departamento</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
