'use client';
import Flag from '@/components/common/Flag';
import { Button } from '@/components/ui/button';
import InputField from '@/components/ui/input-field';
import Spinner from '@/components/ui/spinner';
import { titleFont } from '@/lib/fonts';
import { usePostSalaryCetificates } from '@/hooks';
const SalaryCertificatesForm = () => {
  const { onSubmit, register, mutation } = usePostSalaryCetificates();
  return (
    <form onSubmit={onSubmit}>
      <h5
        className={`${titleFont.className} mb-3 text-base font-semibold text-gray-900 md:text-xl`}
      >
        Solicitud de constancia de salario
      </h5>
      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Por favor, indique el motivo de la solicitud.
      </p>
      <Flag />
      <div className="mt-4" />
      <InputField
        id="reason"
        label="Motivo"
        type="text"
        data-cy="input-reason-salary"
        placeholder="Escribe el motivo de la solicitud"
        register={register}
      />
      <div className="flex w-full justify-end">
        <Button type="submit" data-cy="btn-salary" className="mt-4 w-full sm:w-auto " disabled={mutation.isPending}>
          {mutation.isPending ? <Spinner /> : 'Enviar solicitud'}
        </Button>
      </div>
    </form>
  );
};
export default SalaryCertificatesForm;