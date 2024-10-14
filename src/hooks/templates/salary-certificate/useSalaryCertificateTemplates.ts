import { getSalaryCertificateInfo } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetSalaryCertificateTemplate = ({ id }: { id: string }) => {
  const {
    data: SalaryCertificateInfo,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => await getSalaryCertificateInfo({ id }),
    queryKey: ['SalaryCertificateInfo', id], // Incluye el id en la queryKey para evitar conflictos
    staleTime: 5000,
  });

  return {
    SalaryCertificateInfo,
    isLoading,
    isError,
  };
};

export default useGetSalaryCertificateTemplate;
