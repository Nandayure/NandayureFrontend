import './globals.css';
import SessionAuthProvider from '../context/SessionAuthProvider';
import ReactQueryProvider from '@/lib/query-provider';
import { Toaster } from 'react-hot-toast';
import { poppins, roboto } from '@/lib/fonts';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${roboto.variable} ${poppins.className}`}>
      <body className="">
        <SessionAuthProvider>
          <ReactQueryProvider>
            <Toaster reverseOrder={false} />
            {children}
          </ReactQueryProvider>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
