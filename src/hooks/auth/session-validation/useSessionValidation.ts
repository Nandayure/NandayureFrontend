import { useEffect, useRef } from "react";
import { sessionValidation } from "@/services/auth/session-validation/actions";
import { useSession } from "next-auth/react";

/**
 * Hook que ejecuta sessionValidation cada 5 segundos para validar la sesión.
 * Solo hace el fetch si el usuario tiene sesión activa.
 * Si la sesión es inválida, ejecuta onInvalidSession.
 * @param onInvalidSession función a ejecutar si la sesión es inválida
 */
export function useSessionValidation(onInvalidSession?: () => void) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    let isMounted = true;
    async function validate() {
      // Solo valida si hay sesión activa
      if (status !== "authenticated" || !session?.user) return;
      try {
        await sessionValidation();
      } catch (e) {
        if (isMounted && onInvalidSession) {
          onInvalidSession();
        }
      }
    }
    validate();
    intervalRef.current = setInterval(validate, 5000);
    return () => {
      isMounted = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onInvalidSession, status, session]);
}
