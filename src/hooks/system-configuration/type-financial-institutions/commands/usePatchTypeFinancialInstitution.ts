
import { UpdateTypeFinancialInstitutionsSchema } from "@/schemas";
import { patchTypeFinancialInstitutions } from "@/services";
import { PatchTypeFinancialInstitutions } from "@/types";
import { notify } from "@/utils/notification";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormsFields = z.infer<typeof UpdateTypeFinancialInstitutionsSchema>;

interface Props {
  setIsOpen: (value: boolean) => void;
  typeFinancialInstitutionId: number;
}

const usePatchTypeFinancialInstitution = ({
  setIsOpen,
  typeFinancialInstitutionId,
}: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(UpdateTypeFinancialInstitutionsSchema),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: PatchTypeFinancialInstitutions) =>
      await patchTypeFinancialInstitutions(typeFinancialInstitutionId, data),
    mutationKey: ['patchTypeFinancialInstitutions'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllTypeFinancialInstitutions'] });
    },
  });

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    const ConvertData = convertTypeFinancialInstitutionsTypes(data);
    try {
      await notify(mutation.mutateAsync(ConvertData), {
        loading: 'Actualizando tipo de institución financiera...',
        success: 'Tipo de institución financiera actualizado',
        error: 'Error al actualizar tipo de institución financiera',
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

export default usePatchTypeFinancialInstitution;

export const convertTypeFinancialInstitutionsTypes = (
  typeFinancialInstitutions: any,
): PatchTypeFinancialInstitutions => {
  return {
    name: typeFinancialInstitutions.name,
  };
};