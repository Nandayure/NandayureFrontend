import { jwtDecode } from 'jwt-decode';
import { useSession } from 'next-auth/react';

const useGetRoles = () => {
  const { data: session, status } = useSession();
  const token = session?.user?.access_token;

  let roles;
  if (token) {
    const payload: any = jwtDecode(token);
    roles = payload.roles;
  }
  return {
    roles,
    status,
  };
};

export default useGetRoles;
