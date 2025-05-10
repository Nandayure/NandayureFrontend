import { useEffect, useRef } from "react";
import { sessionValidation } from "@/services/auth/session-validation/actions";

/**
 * Hook que ejecuta sessionValidation cada 5 segundos para validar la sesión.
 * Si la sesión es inválida, ejecuta onInvalidSession.
 * @param onInvalidSession función a ejecutar si la sesión es inválida
 */
export function useSessionValidation(onInvalidSession?: () => void) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function validate() {
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
  }, [onInvalidSession]);
}
