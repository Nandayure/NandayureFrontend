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
import {
  useGetAllTypeFinancialInstitutions,
  usePostFinancialInstitution,
} from '@/hooks';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AddFinancialInstitutionsModal() {
  const {
    register,
    onSubmit,
    handleSubmit,
    handleAddNew,
    isAddModalOpen,
    setIsAddModalOpen,
    errors,
    setValue,
  } = usePostFinancialInstitution();
  const { typeFinancialInstitutions } = useGetAllTypeFinancialInstitutions();

  return (
    <>
      <Button onClick={handleAddNew}>
        <Plus className="mr-2 h-4 w-4" /> Agregar Institución Financiera
      </Button>
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nueva Institución Financiera</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <div className="grid gap-2">
                <Label htmlFor="deductionPercentage">
                  Porcentaje de deducción
                </Label>
                <Input
                  id="deductionPercentage"
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
              <Button type="submit">Agregar institución financiera</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
