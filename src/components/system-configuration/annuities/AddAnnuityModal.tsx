
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { usePostAnnuity, useGetEmployees } from '@/hooks';

export default function AddAnnuityModal() {
  const {
    register,
    onSubmit,
    handleSubmit,
    isAddModalOpen,
    setIsAddModalOpen,
    errors,
  } = usePostAnnuity();

  const { employees, isLoading } = useGetEmployees();

  const handleAddNew = () => {
    setIsAddModalOpen(true);
  };

  return (
    <>
      <Button onClick={handleAddNew} className="mb-4">
        <Plus className="mr-2 h-4 w-4" /> Agregar Anualidad
      </Button>
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nueva Anualidad</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div>
                <label htmlFor="Date" className="block text-sm font-medium">Fecha</label>
                <input
                  id="Date"
                  type="date"
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
  {...register('Amount', { valueAsNumber: true })} 
  className="w-full px-3 py-2 border rounded"
/>

                {errors.Amount && <p className="text-red-500 text-xs mt-2">{errors.Amount.message}</p>}
              </div>
              <div>
                <label htmlFor="EmployeeId" className="block text-sm font-medium">Empleado</label>
                <select
                 id="EmployeeId"
                {...register("EmployeeId")}
                className="w-full px-3 py-2 border rounded"
>
                <option value="">Selecciona un empleado</option>
                {!isLoading && employees?.map((Employee) => (
                Employee && (
               <option key={Employee.id} value={Employee.id}> {/* El valor aquí será string */}
                {Employee.Name} {Employee.Surname1} {Employee.Surname2}
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
              <Button type="submit">Agregar Anualidad</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
