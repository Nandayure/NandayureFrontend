import { patchDepartment, postDepartment } from '@/services';
import { PatchDepartment } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UpdateDepartmentSchema } from '@/schemas';
import { notify, showError } from '@/utils/notification';
import { z } from 'zod';

type FormsFields = z.infer<typeof UpdateDepartmentSchema>;
interface Props {
  setIsOpen: (value: boolean) => void;
  departmentId: number;
}

const usePatchDepartament = ({ setIsOpen, departmentId }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(UpdateDepartmentSchema),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: PatchDepartment) =>
      await patchDepartment({ departmentId: departmentId, department: data }),
    mutationKey: ['patchDepartment'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllDepartments'] });
    },
  });

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    const ConvertData = convertDepartmentTypes(data);
    try {
      await notify(mutation.mutateAsync(ConvertData), {
        loading: 'Actualizando departamento...',
        success: 'Departamento actualizado',
        error: 'Error al actualizar departamento',
      });
      setIsOpen(false);
    } catch (error: any) {
      setIsOpen(false);
    }
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    setValue,
    mutation,
  };
};

export default usePatchDepartament;

export const convertDepartmentTypes = (departament: any): PatchDepartment => {
  return {
    id: departament.id,
    name: departament.name,
    description: departament.description,
    departmentHeadId: departament.departmentHeadId,
    departmentProgramId: parseInt(departament.departmentProgramId, 10),
  };
};
