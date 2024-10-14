'use client';
import Spinner from '../../ui/spinner';
import SelectField from '../../ui/select-fields';
import InputField from '../../ui/input-field';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useGetEmbargoes, useGetGenders, useGetMaritalStatus, usePostEmployee } from '@/hooks';
import useGetJobsPositions from '@/hooks/auth/register/useGetJobPositions';

const RegisterForm = () => {
  const { genders } = useGetGenders();
  const { maritalStatus } = useGetMaritalStatus();
  const { JobsPositions } = useGetJobsPositions();
  const { Embargoes } = useGetEmbargoes();
  const { handleSubmit, onSubmit, register, mutation, errors } =
    usePostEmployee();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información Personal */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Información personal
          </h2>
          <div className="space-y-4">
            <InputField
              id="Name"
              label="Nombre"
              type="text"
              placeholder="Escribe tu nombre aquí"
              register={register}
              errors={errors}
            />
            <InputField
              id="Surname1"
              label="Primer apellido"
              type="text"
              placeholder="Escribe tu primer apellido aquí"
              register={register}
              errors={errors}
            />
            <InputField
              id="Surname2"
              label="Segundo apellido"
              type="text"
              placeholder="Escribe tu segundo apellido aquí"
              register={register}
              errors={errors}
            />
            <InputField
              id="Birthdate"
              label="Fecha de nacimiento"
              type="date"
              register={register}
              errors={errors}
            />
            <SelectField
              id="GenderId"
              label="Género"
              options={genders}
              register={register}
              errors={errors}
            />
            <SelectField
              id="MaritalStatusId"
              label="Estado civil"
              options={maritalStatus}
              register={register}
              errors={errors}
            />
          </div>
          {/* Información de Contacto */}
          <div className="mt-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Información de Contacto
            </h2>
            <div className="space-y-4">
              <InputField
                id="Email"
                label="Correo electrónico"
                type="email"
                placeholder="Escribe tu correo electrónico aquí"
                register={register}
                errors={errors}
              />
              <InputField
                id="CellPhone"
                label="Teléfono celular"
                type="tel"
                placeholder="Escribe tu número de teléfono aquí"
                register={register}
                errors={errors}
              />
            </div>
          </div>
        </div>

        {/* Información Laboral */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Información laboral
          </h2>
          <div className="space-y-4">
            <InputField
              id="id"
              label="Identificación"
              type="text"
              placeholder="Escribe tu identificación laboral aquí"
              register={register}
              errors={errors}
            />
            <InputField
              id="HiringDate"
              label="Fecha de contratación"
              type="date"
              register={register}
              errors={errors}
            />
            <InputField
              id="NumberChlidren"
              label="Número de hijos"
              type="number"
              placeholder="Escribe el número de hijos aquí"
              register={register}
              errors={errors}
            />
            <SelectField
              id="JobPositionId"
              label="Puesto de trabajo"
              options={JobsPositions}
              register={register}
              errors={errors}
            />
            <InputField
              id="AvailableVacationDays"
              label="Días de vacaciones"
              type="number"
              placeholder="Escribe los días de vacaciones aquí"
              register={register}
              errors={errors}
            />

          </div>
        </div>
      </div>
      {errors.root && (
        <div className="text-red-500 text-sm">{errors.root.message}</div>
      )}
      <div className="flex flex-col items-center">
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? <Spinner /> : 'Registrarse'}
        </Button>
        <Link href={'/'}>
          <Button className="mt-4 w-full" variant={'link'}>
            Regresar al inicio
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
