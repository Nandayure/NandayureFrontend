import { Inter, Poppins } from 'next/font/google';

// Fuente principal - Inter para contenido general
export const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});


export const titleFont = Poppins({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});