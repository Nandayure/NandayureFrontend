import React, { useState } from 'react';
import { SelectItem } from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { UseFormRegister } from 'react-hook-form';

interface BudgetCode {
  id: number;
  CodSalary: string | null;
  CodExtra: string | null;
  CodAnuity: string | null;
  CodSalaryPlus: string | null;
}

interface BudgetCodeItemProps {
  code: BudgetCode;
}

export function BudgetCodeItem({ code }: BudgetCodeItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <SelectItem
          value={code.id.toString()}
          className="cursor-pointer"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {code.id}
        </SelectItem>
      </PopoverTrigger>
      <PopoverContent
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="w-80"
      >
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Código de Presupuesto</h4>
            <p className="text-sm text-muted-foreground">
              Detalles del código presupuestario seleccionado.
            </p>
          </div>
          <div className="grid gap-2">
            {code.CodSalary && (
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-sm font-medium">Salario:</span>
                <span className="col-span-2 text-sm">{code.CodSalary}</span>
              </div>
            )}
            {code.CodExtra && (
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-sm font-medium">Extra:</span>
                <span className="col-span-2 text-sm">{code.CodExtra}</span>
              </div>
            )}
            {code.CodAnuity && (
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-sm font-medium">Anualidad:</span>
                <span className="col-span-2 text-sm">{code.CodAnuity}</span>
              </div>
            )}
            {code.CodSalaryPlus && (
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-sm font-medium">Salario Plus:</span>
                <span className="col-span-2 text-sm">{code.CodSalaryPlus}</span>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
