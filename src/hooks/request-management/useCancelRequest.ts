import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelRequest } from '@/services/request-management/actions';
import { toast } from 'react-hot-toast';

interface UseCancelRequestProps {
  onSuccess?: () => void;
}

export const useCancelRequest = ({ onSuccess }: UseCancelRequestProps = {}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, reason }: { id: number; reason: string }) => {
      return await cancelRequest(id, reason);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllRequests'] });
      queryClient.invalidateQueries({ queryKey: ['getCurrentToApprove'] });
      queryClient.invalidateQueries({ queryKey: ['AllRequestsById'] });
      toast.success('Solicitud cancelada exitosamente');
      onSuccess?.();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast.error('Error al cancelar la solicitud');
      setIsDialogOpen(false);
    },
  });

  return {
    mutation,
    isDialogOpen,
    setIsDialogOpen,
  };
};

export default useCancelRequest;