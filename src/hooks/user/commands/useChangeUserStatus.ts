import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeUserStatus } from '@/services/user/commands/actions';
import { toast } from 'react-hot-toast';
import { ChangeUserStatus } from '@/types/user/user.response';

interface UseChangeUserStatusProps {
  onSuccess?: () => void;
}

export const useChangeUserStatus = ({ onSuccess }: UseChangeUserStatusProps = {}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, status }: ChangeUserStatus) => {
      return await changeUserStatus({ id, status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availableUsers'] });
      queryClient.invalidateQueries({ queryKey: ['unavailableUsers'] });
      toast.success('Estado del usuario actualizado exitosamente');
      onSuccess?.();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast.error('Error al actualizar el estado del usuario');
    }
  });

  return {
    mutation,
    isDialogOpen,
    setIsDialogOpen,
  };
};

export default useChangeUserStatus;