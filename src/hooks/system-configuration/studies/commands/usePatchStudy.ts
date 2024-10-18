import { UpdateStudySchema } from '@/schemas';
import { patchStudy } from '@/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { notify } from '@/utils/notification';
import { PatchStudies } from '@/types';

type FormsFields = z.infer<typeof UpdateStudySchema>;

interface Props {
  setIsOpen: (value: boolean) => void;
  studyId: number;
}

const usePatchStudy = ({ setIsOpen, studyId }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(UpdateStudySchema),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: PatchStudies) => await patchStudy(studyId, data),
    mutationKey: ['patchStudy'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllStudies'] });
    },
  });

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    const ConvertData = convertStudyTypes(data);
    try {
      await notify(mutation.mutateAsync(ConvertData), {
        loading: 'Actualizando estudio...',
        success: 'Estudio actualizado',
        error: 'Error al actualizar estudio',
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

export default usePatchStudy;

const convertStudyTypes = (study: any): PatchStudies => {
  return {
    id: study.id,
    description: study.description,
    weight: parseInt(study.weight),
    Dedication: parseInt(study.Dedication),
    Restriction: parseInt(study.Restriction),
  };
};
