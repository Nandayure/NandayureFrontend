"use client";
import { useRouter } from "next/navigation";
import { useSessionValidation } from "@/hooks/auth/session-validation/useSessionValidation";

/**
 * Componente que ejecuta la validación de sesión cada 5 segundos y redirige si la sesión es inválida.
 */
export default function SessionValidationWatcher() {
  const router = useRouter();
  useSessionValidation(() => {
    router.replace("/auth/session-expired");
  });
  return null;
}
