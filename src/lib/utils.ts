import { format } from '@formkit/tempo';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string) =>
  format({
    date: new Date(dateString), 
    format: 'D MMMM YYYY',
    locale: 'es',
  });

