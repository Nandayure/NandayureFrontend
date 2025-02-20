import { Inter, Montserrat, Poppins, Roboto } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export const titleFont = Montserrat({
  subsets: ['latin'],
  weight: ['500', '700'],
});


export const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})
 
export const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})
 