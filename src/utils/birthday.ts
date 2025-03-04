// birthday-utils.ts - Utilidades para manejar el efecto de cumpleaños
/**
 * Obtiene la clave única para el localStorage basada en la fecha actual y el ID del usuario
 */
export function getBirthdayKey(userId: number): string {
    // Usando la fecha actual aseguramos que se reinicie cada día
    const today = new Date().toISOString().split('T')[0]; // formato 'YYYY-MM-DD'
    return `birthday-shown-${userId}-${today}`;
  }
  
  /**
   * Verifica si se debe mostrar el efecto de cumpleaños basado en:
   * - La bandera isBirthday del backend
   * - El número de veces que ya se ha mostrado hoy
   */
  export function shouldShowBirthdayEffect(
    userId: number, 
    isBirthday: boolean, 
    maxDisplaysPerDay = 2
  ): boolean {
    // Si no es cumpleaños o no hay ID de usuario, no mostrar
    if (!isBirthday || !userId) return false;
    
    // Verificar cuántas veces se ha mostrado hoy
    const birthdayKey = getBirthdayKey(userId);
    const shownCount = Number(localStorage.getItem(birthdayKey)) || 0;
    
    // Solo mostrar si no hemos alcanzado el límite
    return shownCount < maxDisplaysPerDay;
  }
  
  /**
   * Incrementa el contador de veces que se ha mostrado el efecto hoy
   */
  export function incrementBirthdayCounter(userId: number): void {
    const birthdayKey = getBirthdayKey(userId);
    const shownCount = Number(localStorage.getItem(birthdayKey)) || 0;
    localStorage.setItem(birthdayKey, (shownCount + 1).toString());
  }
  
  /**
   * Reinicia el contador para pruebas
   */
  export function resetBirthdayCounter(userId: number): void {
    if (!userId) return;
    const birthdayKey = getBirthdayKey(userId);
    localStorage.removeItem(birthdayKey);
    console.log("Contador de cumpleaños reiniciado para el usuario:", userId);
  }
