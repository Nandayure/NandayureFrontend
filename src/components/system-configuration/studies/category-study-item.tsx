import React, { useState } from 'react';
import { SelectItem } from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export interface StudiesCategory {
  id: string;
  description: string;
  weight: number;
  Dedication: number;
  Restriction: number;
}

interface StudiesCategoryItemProps {
  category: StudiesCategory;
}

export function StudiesCategoryItem({ category }: StudiesCategoryItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <SelectItem
          value={category.id}
          className="cursor-pointer"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          data-cy={`select-item-${category.id}`}
        >
          {category.id}
        </SelectItem>
      </PopoverTrigger>
      <PopoverContent
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="w-80"
        data-cy={`popover-content-${category.id}`}
      >
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4
              className="font-medium leading-none"
              data-cy="popover-title"
            >
              Categoría de Estudios
            </h4>
            <p
              className="text-sm text-muted-foreground"
              data-cy="popover-description"
            >
              Detalles de la categoría de estudios seleccionada.
            </p>
          </div>
          <div className="grid gap-2">
            <div
              className="grid grid-cols-3 items-center gap-4"
              data-cy="popover-description-row"
            >
              <span className="text-sm font-medium">Descripción:</span>
              <span
                className="col-span-2 text-sm"
                data-cy="popover-description-value"
              >
                {category.description}
              </span>
            </div>
            <div
              className="grid grid-cols-3 items-center gap-4"
              data-cy="popover-weight-row"
            >
              <span className="text-sm font-medium">Peso:</span>
              <span
                className="col-span-2 text-sm"
                data-cy="popover-weight-value"
              >
                {category.weight}
              </span>
            </div>
            <div
              className="grid grid-cols-3 items-center gap-4"
              data-cy="popover-dedication-row"
            >
              <span className="text-sm font-medium">Dedicación:</span>
              <span
                className="col-span-2 text-sm"
                data-cy="popover-dedication-value"
              >
                {category.Dedication}
              </span>
            </div>
            <div
              className="grid grid-cols-3 items-center gap-4"
              data-cy="popover-restriction-row"
            >
              <span className="text-sm font-medium">Restricción:</span>
              <span
                className="col-span-2 text-sm"
                data-cy="popover-restriction-value"
              >
                {category.Restriction}
              </span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
