import { fetchRoles } from '@/services/roles/queries/actions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { notify } from '@/utils/notification';
import { Role } from '@/types/roles/roles';
import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';

export const useRolesManagement = () => {
  const queryClient = useQueryClient();

  // Fetch all roles
  const { data: roles, isLoading: isLoadingRoles, isError: isRolesError } = useQuery({
    queryKey: ['roles'],
    queryFn: fetchRoles,
  });

  // Add role to user
  const addRoleMutation = useMutation({
    mutationFn: async ({ userId, roleId }: { userId: string; roleId: number }) => {
      return await httpClient.post(ROUTES.ROLES_MANAGEMENT.ADD_ROLE_TO_USER, { userId, roleId });
    },
    onSuccess: () => {
      // Invalidar tanto los roles como la lista de usuarios
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      queryClient.invalidateQueries({ queryKey: ['getAllUsers'] });
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
  });

  // Remove role from user
  const removeRoleMutation = useMutation({
    mutationFn: async ({ userId, roleId }: { userId: string; roleId: number }) => {
      return await httpClient.post(ROUTES.ROLES_MANAGEMENT.REMOVE_ROLE_FROM_USER, { userId, roleId });
    },
    onSuccess: () => {
      // Invalidar tanto los roles como la lista de usuarios
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      queryClient.invalidateQueries({ queryKey: ['getAllUsers'] });
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
  });

  const addRoleToUser = async (userId: string, roleId: number) => {
    try {
      await notify(addRoleMutation.mutateAsync({ userId, roleId }), {
        loading: 'Agregando rol...',
        success: 'Rol agregado exitosamente',
        error: 'Error al agregar rol',
      });
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };

  const removeRoleFromUser = async (userId: string, roleId: number) => {
    try {
      await notify(removeRoleMutation.mutateAsync({ userId, roleId }), {
        loading: 'Removiendo rol...',
        success: 'Rol removido exitosamente',
        error: 'Error al remover rol',
      });
    } catch (error) {
      console.error('Error removing role:', error);
    }
  };

  return {
    roles,
    isLoadingRoles,
    isRolesError,
    addRoleToUser,
    removeRoleFromUser,
  };
};