import { format as formatDateFns, isValid, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString?: string): string => {
  if (!dateString) return 'Fecha no disponible';
  
  try {
    // Intentar parsear la fecha
    const date = parseISO(dateString);
    
    // Verificar si la fecha es válida
    if (!isValid(date)) {
      return 'Fecha inválida';
    }
    
    // Formatear la fecha utilizando date-fns correctamente
    return formatDateFns(date, 'd MMMM yyyy', { locale: es });
  } catch (error) {
    console.error('Error al formatear fecha:', error);
    return 'Error en formato de fecha';
  }
};

