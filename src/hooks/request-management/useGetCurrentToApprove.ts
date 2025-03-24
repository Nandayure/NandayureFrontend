import { getCurrentToApprove } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetCurrentToApprove = () => {
  const { data, isLoading: queryLoading } = useQuery({
    queryFn: async () => await getCurrentToApprove(),
    queryKey: ['getCurrentToApprove'],
    // Actualizar cada 30 segundos
    refetchInterval: 30000,
    // Considerar datos obsoletos después de 15 segundos
    staleTime: 15000,
    // Revalidar al enfocar la ventana
    refetchOnWindowFocus: true,
    // Revalidar al reconectar
    refetchOnReconnect: true,
    // Reintento en caso de error
    retry: 3,
    retryDelay: 1000,
  });

  const isLoading = queryLoading;
  const sortedRequests = Array.isArray(data) ? [...data].reverse() : undefined;

  return {
    currentToApprove: sortedRequests,
    isLoading,
  };
};

export default useGetCurrentToApprove;
