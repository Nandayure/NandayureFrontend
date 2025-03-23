import { patchRequestApproval } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useGetToken from '../common/useGetToken';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { CurrentToApprove } from '@/types';

// Zod schema for request approval
const requestApprovalSchema = z.object({
  reason: z.string()
    .min(10, { message: "La razón debe tener al menos 10 caracteres" })
    .max(500, { message: "La razón no puede exceder 500 caracteres" })
    .trim()
});

type RequestApprovalFormData = z.infer<typeof requestApprovalSchema>;

const usePatchRequestApproval = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RequestApprovalFormData>({
    resolver: zodResolver(requestApprovalSchema)
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<CurrentToApprove | null>(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { approved: boolean; observation: string }) => {
      await patchRequestApproval(selectedRequest!.id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getCurrentToApprove'],
      });
      queryClient.invalidateQueries({
        queryKey: ['getAllRequests'],
      });
    },
  });

  const handleRequestClick = (request: CurrentToApprove) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const onSubmit = async (
    data: RequestApprovalFormData,
    action: 'approve' | 'reject',
  ) => {
    if (selectedRequest) {
      const updatedRequest = {
        approved: action === 'approve',
        observation: data.reason,
      };

      try {
        await toast.promise(
          new Promise((resolve, reject) => {
            setTimeout(async () => {
              try {
                await mutation.mutateAsync(updatedRequest);
                resolve('Solicitud Enviada');
              } catch (error) {
                reject('Error al enviar solicitud');
              }
            }, 500); // artificial waiting
          }),
          {
            loading: 'Enviando solicitud...',
            success: 'Solicitud enviada',
            error: 'Error al enviar solicitud',
          },
          { duration: 2500 },
        );
      } catch (error: any) {
        console.error(error);
      }

      // Close the modal and reset the form
      setIsModalOpen(false);
      setSelectedRequest(null);
      reset();
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    isModalOpen,
    setIsModalOpen,
    selectedRequest,
    handleRequestClick,
    errors, // Expose errors for form validation
  };
};

export default usePatchRequestApproval;