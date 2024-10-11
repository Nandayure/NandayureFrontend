import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';

interface TypeSelectorProps {
  types: { [key: string]: string };
  selectedType: string;
  onChange: (value: string) => void;
  label: string;
}

function TypeSelector({ types, selectedType, onChange, label }: TypeSelectorProps) {
  return (
    <Select onValueChange={onChange} value={selectedType}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`Selecciona ${label}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          <SelectItem value="all">Todos</SelectItem>
          {Object.entries(types).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default TypeSelector;
