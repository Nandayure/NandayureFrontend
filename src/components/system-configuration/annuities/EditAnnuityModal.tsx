import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { usePatchAnnuity, useGetEmployees } from '@/hooks';
import { Annuity } from '@/types';

interface Props {
  annuity: Annuity;
  annuityId: number;
}

export default function EditAnnuityModal({ annuity, annuityId }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit } = usePatchAnnuity({
    setIsOpen: setIsEditModalOpen,
    annuityId,
  });

  const { employees, isLoading } = useGetEmployees();

  return (
    <>
      <Button variant="outline" size="icon" className="mr-2">
        <Pencil onClick={() => setIsEditModalOpen(true)} className="h-4 w-4" />
      </Button>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Anualidad</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div>
                <label htmlFor="Date" className="block text-sm font-medium">Fecha</label>
                <input
                  id="Date"
                  type="date"
                  defaultValue={new Date(annuity.Date).toISOString().split('T')[0]}
                  {...register('Date')}
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.Date && <p className="text-red-500 text-xs mt-2">{errors.Date.message}</p>}
              </div>
              <div>
                <label htmlFor="Description" className="block text-sm font-medium">Descripción</label>
                <input
                  id="Description"
                  type="text"
                  defaultValue={annuity.Description}
                  {...register('Description')}
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.Description && <p className="text-red-500 text-xs mt-2">{errors.Description.message}</p>}
              </div>
              <div>
  <label htmlFor="Amount" className="block text-sm font-medium">Monto</label>
  <input
    id="Amount"
    type="number"
    defaultValue={Number(annuity.Amount || 0).toFixed(2)} 
    {...register('Amount', { valueAsNumber: true })}
    className="w-full px-3 py-2 border rounded"
  />
  {errors.Amount && <p className="text-red-500 text-xs mt-2">{errors.Amount.message}</p>}
</div>

              <div>
                <label htmlFor="EmployeeId" className="block text-sm font-medium">Empleado</label>
                <select
                  id="EmployeeId"
                  defaultValue={annuity.EmployeeId}
                  {...register("EmployeeId")}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="">Selecciona un empleado</option>
                  {!isLoading && employees?.map((employee) => (
                    employee && (
                      <option key={employee.id} value={employee.id}>
                        {employee.Name} {employee.Surname1} {employee.Surname2}
                      </option>
                    )
                  ))}
                </select>
                {errors.EmployeeId && (
                  <p className="text-red-500 text-xs mt-2">{errors.EmployeeId.message}</p>
                )}
              </div>
              {errors.root && (
                <p className="text-red-500 text-xs mt-2">{errors.root.message}</p>
              )}
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
