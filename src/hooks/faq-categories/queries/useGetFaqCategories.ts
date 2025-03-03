import { useQuery } from '@tanstack/react-query';
import { fetchFaqCategories } from '@/services/faq-categories/queries/actions';

const useGetFaqCategories = () => {
  const {
    data: faqCategories,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['faqCategories'],
    queryFn: fetchFaqCategories,
  });

  return {
    faqCategories,
    isLoading,
    isError,
    error,
    refetch
  };
};

export default useGetFaqCategories;