import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCustomMutation = <T>(
  mutationFn: (data: T) => Promise<any>,
  queryKey?: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    },
    onError: (error: any) => {
      console.error(error);
    },
  });
};
