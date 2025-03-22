import './globals.css';
import { Toaster } from 'react-hot-toast';
import QueryProvider from '@/providers/query-provider';
import SessionProvider from '@/providers/session-provider';
import { inter, titleFont } from '@/lib/fonts';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.className} ${titleFont.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no, user-scalable=no" />
      </head>
      <body>
        <SessionProvider>
          <QueryProvider>
            <Toaster reverseOrder={false} />
            {children}
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
