'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Check, ChevronDown, Filter, X } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';

// Define filter types
export type FilterValue = {
  types: number[];
  states: number[];
  startDate: Date | null | undefined;
  endDate: Date | null | undefined;
};

type RequestFiltersProps = {
  onFilterChange: (filters: FilterValue) => void;
  activeFilters: FilterValue;
  clearFilters: () => void;
};

// Define options for filters
const typeOptions = [
  { id: 1, label: 'Vacaciones' },
  { id: 2, label: 'Certificado de Salario' },
  { id: 3, label: 'Confirmación de Pago' },
];

const stateOptions = [
  { id: 1, label: 'Pendiente' },
  { id: 2, label: 'Aprobado' },
  { id: 3, label: 'Rechazado' },
];

export default function RequestFilters({
  onFilterChange,
  activeFilters,
  clearFilters,
}: RequestFiltersProps) {
  // Use DateRange type from react-day-picker
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: activeFilters.startDate ?? undefined, 
    to: activeFilters.endDate ?? undefined,     
  });

  // Count active filters
  const activeFilterCount =
    activeFilters.types.length +
    activeFilters.states.length +
    (activeFilters.startDate ? 1 : 0) +
    (activeFilters.endDate ? 1 : 0);

  // Handle type selection
  const handleTypeSelect = (typeId: number) => {
    const newTypes = activeFilters.types.includes(typeId)
      ? activeFilters.types.filter((id) => id !== typeId)
      : [...activeFilters.types, typeId];

    onFilterChange({
      ...activeFilters,
      types: newTypes,
    });
  };

  // Handle state selection
  const handleStateSelect = (stateId: number) => {
    const newStates = activeFilters.states.includes(stateId)
      ? activeFilters.states.filter((id) => id !== stateId)
      : [...activeFilters.states, stateId];

    onFilterChange({
      ...activeFilters,
      states: newStates,
    });
  };

  // Handle date selection
  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);

    if (range) {
      onFilterChange({
        ...activeFilters,
        startDate: range.from,
        endDate: range.to,
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-6">
      {/* Type Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-10 border-dashed">
            <Filter className="mr-2 h-4 w-4" />
            Tipo
            {activeFilters.types.length > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 rounded-sm px-1 font-normal"
              >
                {activeFilters.types.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60 p-0" align="start">
          <Command>
            <CommandInput placeholder="Buscar tipo..." />
            <CommandList>
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              <CommandGroup>
                {typeOptions.map((type) => (
                  <CommandItem
                    key={type.id}
                    onSelect={() => handleTypeSelect(type.id)}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        activeFilters.types.includes(type.id)
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <Check className="h-3 w-3" />
                    </div>
                    <span>{type.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* State Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-10 border-dashed">
            <ChevronDown className="mr-2 h-4 w-4" />
            Estado
            {activeFilters.states.length > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 rounded-sm px-1 font-normal"
              >
                {activeFilters.states.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60 p-0" align="start">
          <Command>
            <CommandInput placeholder="Buscar estado..." />
            <CommandList>
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              <CommandGroup>
                {stateOptions.map((state) => (
                  <CommandItem
                    key={state.id}
                    onSelect={() => handleStateSelect(state.id)}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        activeFilters.states.includes(state.id)
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <Check className="h-3 w-3" />
                    </div>
                    <span>{state.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Date Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-10 border-dashed">
            <Calendar className="mr-2 h-4 w-4" />
            Fecha
            {(activeFilters.startDate || activeFilters.endDate) && (
              <Badge
                variant="secondary"
                className="ml-2 rounded-sm px-1 font-normal"
              >
                {activeFilters.startDate && activeFilters.endDate ? '2' : '1'}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from || undefined}
            selected={dateRange}
            onSelect={handleDateSelect}
            numberOfMonths={1}
            locale={es}
          />
          <div className="p-3 border-t">
            <div className="flex justify-between items-center">
              <div className="text-xs text-muted-foreground">
                {dateRange?.from && (
                  <span>
                    {format(dateRange.from, 'PPP', { locale: es })}
                  </span>
                )}
                {dateRange?.from && dateRange?.to && <span> - </span>}
                {dateRange?.to && (
                  <span>
                    {format(dateRange.to, 'PPP', { locale: es })}
                  </span>
                )}
              </div>
              {(dateRange?.from || dateRange?.to) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setDateRange(undefined);
                    onFilterChange({
                      ...activeFilters,
                      startDate: undefined,
                      endDate: undefined,
                    });
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Clear Filters Button */}
      {activeFilterCount > 0 && (
        <Button
          variant="ghost"
          onClick={clearFilters}
          className="h-10"
        >
          <X className="mr-2 h-4 w-4" />
          Limpiar filtros
          <Badge
            variant="secondary"
            className="ml-2 rounded-sm px-1 font-normal"
          >
            {activeFilterCount}
          </Badge>
        </Button>
      )}
    </div>
  );
}