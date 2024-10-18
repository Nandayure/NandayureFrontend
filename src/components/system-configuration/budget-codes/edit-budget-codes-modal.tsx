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
import { usePatchBudgetCode } from '@/hooks';
import { BudgetCode } from '@/types';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

interface Props {
  budgetCode: BudgetCode;
}

export default function EditBudgetCodeMoadol({ budgetCode }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit, mutation } =
    usePatchBudgetCode({
      setIsOpen: setIsEditModalOpen,
      budgetCodeId: budgetCode.id,
    });

  return (
    <>
      <Button variant="outline" size="icon" className="mr-2">
        <Pencil onClick={() => setIsEditModalOpen(true)} className="h-4 w-4" />
      </Button>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Programa Departamental</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Codigo Salario</Label>
                <Input
                  id="CodSalary"
                  defaultValue={budgetCode.CodSalary}
                  {...register('CodSalary')}
                />
                {errors.CodSalary && (
                  <p className="text-red-500 text-xs">
                    {errors.CodSalary.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Codigo Extra</Label>
                <Input
                  id="CodExtra"
                  defaultValue={budgetCode.CodExtra}
                  {...register('CodExtra')}
                />
                {errors.CodExtra && (
                  <p className="text-red-500 text-xs">
                    {errors.CodExtra.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Codigo Anualidad</Label>
                <Input
                  id="CodAnuity"
                  defaultValue={budgetCode.CodAnuity}
                  {...register('CodAnuity')}
                />
                {errors.CodAnuity && (
                  <p className="text-red-500 text-xs">
                    {errors.CodAnuity.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Codigo Salario Plus</Label>
                <Input
                  id="CodSalaryPlus"
                  defaultValue={budgetCode.CodSalaryPlus}
                  {...register('CodSalaryPlus')}
                />
                {errors.CodSalaryPlus && (
                  <p className="text-red-500 text-xs">
                    {errors.CodSalaryPlus.message}
                  </p>
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
