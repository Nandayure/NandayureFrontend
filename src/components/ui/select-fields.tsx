import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface Option {
  id: number;
  Name: string;
}

interface Props {
  id: string;
  label: string;
  options: Option[] | undefined;
  register: UseFormRegister<any>;
  errors?: Record<string, any>;
}

const SelectField: React.FC<Props> = ({
  id,
  label,
  options,
  register,
  errors,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-900 mb-2">
        {label}
      </label>
      <select
        id={id}
        aria-label={`Selecciona tu ${label.toLowerCase()}`}
        defaultValue=""
        className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
        {...register(id)}
      >
        <option>Selecciona tu {label.toLowerCase()}</option>
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.Name}
          </option>
        ))}
      </select>
      {errors?.[id] && (
        <span className="text-red-500 text-sm">{errors[id].message}</span>
      )}
    </div>
  );
};

export default SelectField;