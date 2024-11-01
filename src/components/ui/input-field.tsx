import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  className?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  errors?: Record<string, any>;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  className,
  placeholder,
  register,
  errors,
}) => {
  return (
    <div className={`${className} mt-4`}>
      <label
        htmlFor={id}
        className="block text-md font-medium text-gray-900 mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        aria-label={label}
        aria-describedby={`${id}-error`}
        className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
        {...register(id)}
      />
      {errors?.[id] && (
        <span id={`${id}-error`} className="text-red-500 text-sm">
          {errors[id].message}
        </span>
      )}
    </div>
  );
};

export default InputField;
