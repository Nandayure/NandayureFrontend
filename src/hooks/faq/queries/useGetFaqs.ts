import { useQuery } from '@tanstack/react-query';
import { fetchFaqs } from '@/services/faq/queries/actions';

const useGetFaqs = () => {
  const {
    data: faqs,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['faqs'],
    queryFn: fetchFaqs,
  });

  return {
    faqs,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useGetFaqs;
