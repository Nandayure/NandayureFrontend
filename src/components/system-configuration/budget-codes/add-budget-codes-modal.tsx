import { usePostBudgetCode } from '@/hooks';
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

export default function AddBudgetCodesModal() {
  const {
    register,
    onSubmit,
    handleSubmit,
    handleAddNew,
    isAddModalOpen,
    setIsAddModalOpen,
    errors,
  } = usePostBudgetCode();

  return (
    <>
      <Button onClick={handleAddNew}>
        <Plus className="mr-2 h-4 w-4" /> Agregar Programa Departamental
      </Button>
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Codigo Presupuestario</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Codigo Salario</Label>
                <Input id="CodSalary" {...register('CodSalary')} />
                {errors.CodSalary && (
                  <p className="text-red-500 text-xs">
                    {errors.CodSalary.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Codigo Extra</Label>
                <Input id="CodExtra" {...register('CodExtra')} />
                {errors.CodExtra && (
                  <p className="text-red-500 text-xs">
                    {errors.CodExtra.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Codigo Anuidad</Label>
                <Input id="CodAnuity" {...register('CodAnuity')} />
                {errors.CodAnuity && (
                  <p className="text-red-500 text-xs">
                    {errors.CodAnuity.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Codigo Salario Plus</Label>
                <Input id="CodSalaryPlus" {...register('CodSalaryPlus')} />
                {errors.CodSalaryPlus && (
                  <p className="text-red-500 text-xs">
                    {errors.CodSalaryPlus.message}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Agregar codigo presupuestario</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
