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
  useGetAllTypeFinancialInstitutions,
  usePatchFinancialInstitution,
} from '@/hooks';
import { FinancialInstitutions } from '@/types';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  financialInstitution: FinancialInstitutions;
}

export default function EditFinancialInstitutionsModal({
  financialInstitution,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit, mutation, setValue } =
    usePatchFinancialInstitution({
      setIsOpen: setIsEditModalOpen,
      financialInstitutionId: financialInstitution.id,
    });

  const { typeFinancialInstitutions } = useGetAllTypeFinancialInstitutions();

  return (
    <>
      <Button variant="outline" size="icon" className="mr-2">
        <Pencil onClick={() => setIsEditModalOpen(true)} className="h-4 w-4" />
      </Button>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Institución Financiera</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  defaultValue={financialInstitution.name}
                  type="text"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  defaultValue={financialInstitution.description}
                  type="text"
                  {...register('description')}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="deductionPercentage">
                  Porcentaje de deducción
                </Label>
                <Input
                  id="deductionPercentage"
                  defaultValue={financialInstitution.deductionPercentage}
                  type="text"
                  {...register('deductionPercentage')}
                />
                {errors.deductionPercentage && (
                  <p className="text-red-500 text-xs">
                    {errors.deductionPercentage.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="TypeFinancialInstitutionId">
                  Tipo de institución financiera
                </Label>
                <Select
                  onValueChange={(value) =>
                    setValue('TypeFinancialInstitutionId', Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar programa" />
                  </SelectTrigger>
                  <SelectContent>
                    {typeFinancialInstitutions &&
                      typeFinancialInstitutions.map((type) => (
                        <SelectItem key={type.id} value={type.id.toString()}>
                          {type.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.TypeFinancialInstitutionId && (
                  <p className="text-red-500 text-xs">
                    {errors.TypeFinancialInstitutionId.message}
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
