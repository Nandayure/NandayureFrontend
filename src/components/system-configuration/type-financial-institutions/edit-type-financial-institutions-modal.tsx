'use client'
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
import { usePatchTypeFinancialInstitution } from '@/hooks';
import { TypeFinancialInstitutions } from '@/types';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

interface Props {
  typeFinancialInstitution: TypeFinancialInstitutions;
}

export default function EditTypeFinancialInstitutionsModal({
  typeFinancialInstitution,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, handleSubmit, onSubmit, mutation } =
    usePatchTypeFinancialInstitution({
      setIsOpen: setIsEditModalOpen,
      typeFinancialInstitutionId: typeFinancialInstitution.id,
    });

  return (
    <>    
      <Button variant="outline" size="icon" className="mr-2">
        <Pencil onClick={() => setIsEditModalOpen(true)} className="h-4 w-4" />
      </Button>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Tipo de instituciones financieras</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  defaultValue={typeFinancialInstitution.name}
                  type="text"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
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