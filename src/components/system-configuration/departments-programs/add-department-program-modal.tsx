import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import InputField from '@/components/ui/input-field';
import { usePostDepartmentProgram } from '@/hooks';
import { Plus } from 'lucide-react';

export default function AddDepartmentProgramModal() {
  const {
    register,
    onSubmit,
    handleSubmit,
    handleAddNew,
    isAddModalOpen,
    setIsAddModalOpen,
    errors,
  } = usePostDepartmentProgram();

  return (
    <>
      <Button onClick={handleAddNew}>
        <Plus className="mr-2 h-4 w-4" /> Agregar Programa Departamental
      </Button>
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Programa Departamental</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <InputField
                id="name"
                label="Nombre"
                type="text"
                register={register}
                errors={errors}
              />

            </div>
            <DialogFooter>
              <Button type="submit">Agregar program departamental</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
