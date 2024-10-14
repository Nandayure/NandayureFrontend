import { useSession } from 'next-auth/react';

const useGetToken = () => {
  const { data: session, status } = useSession();
  const token = session?.user?.access_token as string;
  return {
    token,
    status,
  };
};

export default useGetToken;
