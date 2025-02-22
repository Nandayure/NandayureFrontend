'use client';
import Spinner from '../../ui/spinner';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  useGetAllJobPositions,
  useGetAllGender,
  useGetMaritalStatus,
  usePostEmployee,
} from '@/hooks';
import { Controller, useForm } from 'react-hook-form';

const RegisterForm = () => {
  const { genders } = useGetAllGender();
  const { maritalStatus } = useGetMaritalStatus();
  const { jobPositions } = useGetAllJobPositions();
  const {
    handleSubmit,
    onSubmit,
    control,
    register,
    mutation,
    errors,
    setValue,
  } = usePostEmployee();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
      data-cy="form-register"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información Personal */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Información personal
          </h2>
          <div className="space-y-4">
            {/* Nombre */}
            <div className="grid gap-2">
              <Label htmlFor="Name">Nombre</Label>
              <Input
                id="Name"
                placeholder="Escribe tu nombre aquí"
                {...register('Name')}
                data-cy="input-Name"
              />
              {errors.Name && (
                <p className="text-red-500 text-xs" data-cy="error-Name">
                  {errors.Name.message}
                </p>
              )}
            </div>
            {/* Primer apellido */}
            <div className="grid gap-2">
              <Label htmlFor="Surname1">Primer apellido</Label>
              <Input
                id="Surname1"
                placeholder="Escribe tu primer apellido aquí"
                {...register('Surname1')}
                data-cy="input-Surname1"
              />
              {errors.Surname1 && (
                <p className="text-red-500 text-xs" data-cy="error-Surname1">
                  {errors.Surname1.message}
                </p>
              )}
            </div>
            {/* Segundo apellido */}
            <div className="grid gap-2">
              <Label htmlFor="Surname2">Segundo apellido</Label>
              <Input
                id="Surname2"
                placeholder="Escribe tu segundo apellido aquí"
                {...register('Surname2')}
                data-cy="input-Surname2"
              />
              {errors.Surname2 && (
                <p className="text-red-500 text-xs" data-cy="error-Surname2">
                  {errors.Surname2.message}
                </p>
              )}
            </div>
            {/* Fecha de nacimiento */}
            <div className="grid gap-2">
              <Label htmlFor="Birthdate">Fecha de nacimiento</Label>
              <Input
                id="Birthdate"
                type="date"
                {...register('Birthdate')}
                data-cy="input-Birthdate"
              />
              {errors.Birthdate && (
                <p className="text-red-500 text-xs" data-cy="error-Birthdate">
                  {errors.Birthdate.message}
                </p>
              )}
            </div>
            {/* Género */}
            <div className="grid gap-2">
              <Label htmlFor="GenderId">Género</Label>
              <Controller
                name="GenderId"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger data-cy="select-GenderId">
                      <SelectValue placeholder="Seleccionar género" />
                    </SelectTrigger>
                    <SelectContent>
                      {genders &&
                        genders.map((gender) => (
                          <SelectItem key={gender.id} value={gender.id.toString()}>
                            {gender.Name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.GenderId && (
                <p className="text-red-500 text-xs" data-cy="error-GenderId">
                  {errors.GenderId.message}
                </p>
              )}
            </div>
            {/* Estado civil */}
            <div className="grid gap-2">
              <Label htmlFor="MaritalStatusId">Estado civil</Label>
              <Controller
                name="MaritalStatusId"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger data-cy="select-MaritalStatusId">
                      <SelectValue placeholder="Seleccionar estado civil" />
                    </SelectTrigger>
                    <SelectContent>
                      {maritalStatus &&
                        maritalStatus.map((status) => (
                          <SelectItem key={status.id} value={status.id.toString()}>
                            {status.Name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.MaritalStatusId && (
                <p className="text-red-500 text-xs" data-cy="error-MaritalStatusId">
                  {errors.MaritalStatusId.message}
                </p>
              )}
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="mt-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Información de Contacto
            </h2>
            <div className="space-y-4">
              {/* Correo electrónico */}
              <div className="grid gap-2">
                <Label htmlFor="Email">Correo electrónico</Label>
                <Input
                  id="Email"
                  type="email"
                  placeholder="Escribe tu correo electrónico aquí"
                  {...register('Email')}
                  data-cy="input-Email"
                />
                {errors.Email && (
                  <p className="text-red-500 text-xs" data-cy="error-Email">
                    {errors.Email.message}
                  </p>
                )}
              </div>
              {/* Teléfono celular */}
              <div className="grid gap-2">
                <Label htmlFor="CellPhone">Teléfono celular</Label>
                <Input
                  id="CellPhone"
                  type="tel"
                  placeholder="Escribe tu número de teléfono aquí"
                  {...register('CellPhone')}
                  data-cy="input-CellPhone"
                />
                {errors.CellPhone && (
                  <p className="text-red-500 text-xs" data-cy="error-CellPhone">
                    {errors.CellPhone.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Información Laboral */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Información laboral
          </h2>
          <div className="space-y-4">
            {/* Identificación */}
            <div className="grid gap-2">
              <Label htmlFor="id">Identificación</Label>
              <Input
                id="id"
                placeholder="Escribe tu identificación laboral aquí"
                {...register('id')}
                data-cy="input-id"
              />
              {errors.id && (
                <p className="text-red-500 text-xs" data-cy="error-id">
                  {errors.id.message}
                </p>
              )}
            </div>
            {/* Fecha de contratación */}
            <div className="grid gap-2">
              <Label htmlFor="HiringDate">Fecha de contratación</Label>
              <Input
                id="HiringDate"
                type="date"
                {...register('HiringDate')}
                data-cy="input-HiringDate"
              />
              {errors.HiringDate && (
                <p className="text-red-500 text-xs" data-cy="error-HiringDate">
                  {errors.HiringDate.message}
                </p>
              )}
            </div>
            {/* Número de hijos */}
            <div className="grid gap-2">
              <Label htmlFor="NumberChlidren">Número de hijos</Label>
              <Input
                id="NumberChlidren"
                type="number"
                placeholder="Escribe el número de hijos aquí"
                {...register('NumberChlidren')}
                data-cy="input-NumberChlidren"
              />
              {errors.NumberChlidren && (
                <p className="text-red-500 text-xs" data-cy="error-NumberChlidren">
                  {errors.NumberChlidren.message}
                </p>
              )}
            </div>
            {/* Puesto de trabajo */}
            <div className="grid gap-2">
              <Label htmlFor="JobPositionId">Puesto de trabajo</Label>
              <Controller
                name="JobPositionId"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger data-cy="select-JobPositionId">
                      <SelectValue placeholder="Seleccionar puesto de trabajo" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobPositions &&
                        jobPositions.map((position) => (
                          <SelectItem
                            key={position.id}
                            value={position.id.toString()}
                          >
                            {position.Name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.JobPositionId && (
                <p className="text-red-500 text-xs" data-cy="error-JobPositionId">
                  {errors.JobPositionId.message}
                </p>
              )}
            </div>
            {/* Días de vacaciones */}
            <div className="grid gap-2">
              <Label htmlFor="AvailableVacationDays">Días de vacaciones</Label>
              <Input
                id="AvailableVacationDays"
                type="number"
                placeholder="Escribe los días de vacaciones aquí"
                {...register('AvailableVacationDays')}
                data-cy="input-AvailableVacationDays"
              />
              {errors.AvailableVacationDays && (
                <p className="text-red-500 text-xs" data-cy="error-AvailableVacationDays">
                  {errors.AvailableVacationDays.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {errors.root && (
        <div className="text-red-500 text-sm" data-cy="error-root">
          {errors.root.message}
        </div>
      )}
      <div className="flex flex-col items-center">
        <Button
          type="submit"
          disabled={mutation.isPending}
          data-cy="button-Registrarse"
        >
          {mutation.isPending ? <Spinner /> : 'Registrarse'}
        </Button>
        <Link href={'/'}>
          <Button className="mt-4 w-full" variant={'link'} data-cy="button-Regresar">
            Regresar al inicio
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
