import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { incrementBirthdayCounter, 
    resetBirthdayCounter, 
    shouldShowBirthdayEffect } 
    from "@/utils/birthday";

export function useBirthdayEffect(maxDisplaysPerDay = 2) {
  const { data: session } = useSession();
  const [showEffect, setShowEffect] = useState(false);
  useEffect(() => {
    // Si no hay sesión o no hay datos de usuario, no hacer nada
    if (!session?.user) return;
    const userId = session.user.employeeId;
    // Usar la bandera isBirthday que viene del backend
    const isBirthday = session.user.isBirthday === true;
    
    // Verificar si debemos mostrar el efecto (basado en la bandera y en el contador)
    if (shouldShowBirthdayEffect(userId, isBirthday, maxDisplaysPerDay)) {
      setShowEffect(true);
      
      // Incrementar el contador
      incrementBirthdayCounter(userId);
    }
  }, [session, maxDisplaysPerDay]);
  return { 
    showEffect, 
    setShowEffect,
    // Incluir una función para reiniciar manualmente si es necesario
    resetEffect: () => {
      if (session?.user?.employeeId) {
        resetBirthdayCounter(session.user.employeeId);
      }
    }
  };
}
