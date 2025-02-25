import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Spinner from '@/components/ui/spinner';
import { X } from 'lucide-react';
import { useGetEmployeeId, useUpdateEmployee } from '@/hooks';
import { UpdateEmployee } from '@/types';
import { useEffect, useState } from 'react';

interface Field {
  id: string;
  label: string;
  defaultValue: string;
  type?: string;
}

interface DialogProfileProps {
  fields: Field[];
  title: string;
  description: string;
}

export function DialogProfile({
  fields,
  title,
  description,
}: DialogProfileProps) {

  const [isOpen, setIsOpen] = useState(false);
  

  const { employeeId } = useGetEmployeeId();
  const { trigger, handleSubmit, mutation, onSubmit, register, errors } =
    useUpdateEmployee({
      employeeId: employeeId,
      setIsOpen,
    });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogTrigger asChild>
     
  <Button variant="outline" data-cy="edit-profile">Editar</Button>

</DialogTrigger>

      <DialogContent className="sm:max-w-[450px] ">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {fields.map((field) => (
              <div
                key={field.id}
                className="grid grid-cols-4 items-center gap-4"
              >
                <Label htmlFor={field.id} className="text-right">
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  defaultValue={field.defaultValue}
                  type={field.type || 'text'}
                  className="col-span-3"
                  data-cy={`input-${field.id}`}
                  {...register(field.id as keyof UpdateEmployee, {
                    onBlur: () => trigger(field.id as keyof UpdateEmployee),
                  })}
                />
                {errors[field.id as keyof UpdateEmployee] && (
                  <p className="text-red-500 text-sm mt-2 col-span-4">
                    {errors[field.id as keyof UpdateEmployee]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className=""
              disabled={mutation.isPending}
              data-cy="button-save"
            >
              {mutation.isPending ? <Spinner /> : 'Guardar'}
            </Button>

          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
