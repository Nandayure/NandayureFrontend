import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import InputField from '@/components/ui/input-field';
import usePostDepartament from '@/hooks/system-configuration/departments/commands/usePostDepartment';

import { Plus } from 'lucide-react';

export default function AddDepartamenModal() {
  const {
    register,
    onSubmit,
    handleSubmit,
    handleAddNew,
    isAddModalOpen,
    setIsAddModalOpen,
  } = usePostDepartament();

  return (
    <>
      <Button onClick={handleAddNew} className="mb-4">
        <Plus className="mr-2 h-4 w-4" /> Agregar Departamento
      </Button>
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Departamento</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <InputField
                id="name"
                label="Nombre"
                type="text"
                register={register}
              />
              <InputField
                id="description"
                label="Descripción"
                type="text"
                register={register}
              />
              <InputField
                id="departmentProgramId"
                label="Programa"
                type="number"
                register={register}
              />
              <InputField
                id="budgetCodeId"
                label="Código de presupuesto"
                type="number"
                register={register}
              />
              <InputField
                id="departmentHeadId"
                label="Jefe de departamento"
                type="text"
                register={register}
              />
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
