import { useQuery } from "@tanstack/react-query";
import useDebounce from "../common/useDebounce";
import { checkEmail, checkId } from "@/services/validations/actions";

interface ValidationOptions {
  enabled?: boolean;
  retry?: number;
  refetchOnWindowFocus?: boolean;
  debounceMs?: number;
}

/**
 * Hook para verificar si un email existe en el sistema con soporte para debounce
 * @param email - Correo electrónico a verificar
 * @param options - Opciones adicionales para la consulta
 * @returns Estado de la consulta con información sobre si el email existe
 */
export const useCheckEmail = (
  email: string | undefined,
  options?: ValidationOptions
) => {
  const debouncedEmail = useDebounce(email, options?.debounceMs);

  return useQuery({
    queryKey: ["check-email", debouncedEmail],
    queryFn: () => (debouncedEmail ? checkEmail(debouncedEmail) : Promise.resolve({ exists: false })),
    enabled: !!debouncedEmail && (options?.enabled !== false),
    retry: options?.retry ?? 1,
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
  });
};

/**
 * Hook para verificar si un ID existe en el sistema con soporte para debounce
 * @param id - Identificación a verificar
 * @param options - Opciones adicionales para la consulta
 * @returns Estado de la consulta con información sobre si el ID existe
 */
export const useCheckId = (
  id: string | undefined,
  options?: ValidationOptions
) => {
  const debouncedId = useDebounce(id, options?.debounceMs);

  return useQuery({
    queryKey: ["check-id", debouncedId],
    queryFn: () => (debouncedId ? checkId(debouncedId) : Promise.resolve({ exists: false })),
    enabled: !!debouncedId && (options?.enabled !== false),
    retry: options?.retry ?? 1,
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
  });
};