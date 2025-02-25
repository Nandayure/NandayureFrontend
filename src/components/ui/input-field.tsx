import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  className?: string;
  placeholder?: string;
  dataCy?: string;
  errorDataCy?: string;
  register: UseFormRegister<any>;
  errors?: Record<string, any>;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  className,
  placeholder,
  dataCy,
  errorDataCy,
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
        data-cy={dataCy}
        {...register(id)}
      />
      {errors?.[id] && (
        <span id={`${id}-error`} className="text-red-500 text-sm" data-cy={errorDataCy}>
          {errors[id].message}
        </span>
      )}
    </div>
  );
};

export default InputField;