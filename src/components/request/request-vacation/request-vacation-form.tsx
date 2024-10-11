'use client';
import { Button } from '@/components/ui/button';
import InputField from '@/components/ui/input-field';
import Spinner from '@/components/ui/spinner';
import { titleFont } from '@/config/fonts';
import { usePostVacation } from '@/hooks';
const RequestVacationForm = () => {
  const { onSubmit, register, mutation, errors } = usePostVacation();

  return (
    <form onSubmit={onSubmit}>
      <h5
        className={`${titleFont.className} mb-3 text-base font-semibold text-gray-900 md:text-xl`}
      >
        Solicitud de Vacaciones
      </h5>
      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Por favor, introduce los datos requeridos para la solicitud.
      </p>
      <div className="flex mb-6 mt-4">
        <div className="flex-1 h-1 bg-dodger-blue-500"></div>
        <div className="flex-1 h-1 bg-golden-dream-500"></div>
        <div className="flex-1 h-1 bg-apple-500"></div>
      </div>

      {/* Campos del formulario */}
      <InputField
        id="daysRequested"
        label="Días Solicitados"
        type="number"
        placeholder="Número de días solicitados"
        register={register}
      />
      <InputField
        id="departureDate"
        label="Fecha de salida"
        type="date"
        register={register}
      />
      <InputField
        id="entryDate"
        label="Fecha de entrada"
        type="date"
        register={register}
      />
      {errors.root && (
        <div className="text-red-500 text-sm">{errors.root.message}</div>
      )}
      <Button
        type="submit"
        className="w-full mt-4"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? <Spinner /> : 'Enviar Solicitud'}
      </Button>
    </form>
  );
};

export default RequestVacationForm;
