import { format } from '@formkit/tempo';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string) =>
  format(new Date(dateString), 'DD/MM/YYYY');
