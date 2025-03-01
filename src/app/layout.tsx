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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no, user-scalable=no" />
      </head>
      <body>
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
