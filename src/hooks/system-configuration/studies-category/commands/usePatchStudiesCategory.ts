import { UpdateStudiesCategorySchema } from "@/schemas";
import { patchStudiesCategory } from "@/services";
import { PatchStudiesCategory } from "@/types";
import { notify } from "@/utils/notification";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormsFields = z.infer<typeof UpdateStudiesCategorySchema>;

interface Props {
  setIsOpen: (value: boolean) => void;
  studiesCategoryId: string;
}

const usePatchStudiesCategory = ({ setIsOpen, studiesCategoryId }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(UpdateStudiesCategorySchema),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: PatchStudiesCategory) =>
      await patchStudiesCategory({ studiesCategoryId: studiesCategoryId, studiesCategory: data }),
    mutationKey: ['patchStudiesCategory'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllStudiesCategory'] });
    },
  });

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    const ConvertData = convertStudiesCategoryTypes(data);
    try {
      await notify(mutation.mutateAsync(ConvertData), {
        loading: 'Actualizando categoría de estudio...',
        success: 'Categoría de estudio actualizada',
        error: 'Error al actualizar categoría de estudio',
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

export default usePatchStudiesCategory;

export const convertStudiesCategoryTypes = (studiesCategory: any): PatchStudiesCategory => {
  return {
    description: studiesCategory.description,
    weight: studiesCategory.weight,
    Dedication: studiesCategory.Dedication,
    Restriction: studiesCategory.Restriction
  };
};