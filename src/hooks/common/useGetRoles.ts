'use client';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { jwtDecode } from 'jwt-decode';
import { useMemo } from 'react';

const useGetRoles = () => {
  const { data: session, status } = useSession();
  const token = session?.user?.access_token;

  const roles = useMemo(() => {
    if (!token) return null;
    const payload: any = jwtDecode(token);
    return payload.roles;
  }, [token]); // Solo recalcula si el token cambia

  const { data } = useQuery({
    queryKey: ['roles', token],
    queryFn: () => roles,
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // Cache de 5 minutos
    gcTime: 1000 * 60 * 10, // Tiempo de recolección de basura
  });

  return { roles: data, status };
};

export default useGetRoles;
