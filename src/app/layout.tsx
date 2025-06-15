import './globals.css';
import { Toaster } from 'react-hot-toast';
import QueryProvider from '@/providers/query-provider';
import SessionProvider from '@/providers/session-provider';
import { inter, titleFont } from '@/lib/fonts';
import SessionValidationWatcher from '@/components/auth/session-validation-watcher';
import { JsonLdSchema, organizationSchema } from '@/components/seo/JsonLdSchema';

export const metadata = {
  title: 'Nandayure - Tu Plataforma de Gestión',
  description: 'Sistema integral de gestión empresarial. Optimiza tus procesos y mejora la eficiencia de tu negocio con nuestra solución completa.',
  keywords: 'gestión empresarial, software de gestión, ERP, optimización de procesos',
  openGraph: {
    title: 'Nandayure - Tu Plataforma de Gestión',
    description: 'Sistema integral de gestión empresarial. Optimiza tus procesos y mejora la eficiencia.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'Nandayure',
    images: [
      {
        url: 'https://nandayure.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nandayure Platform',
      },
    ],
  },
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#ffffff',
  alternates: {
    canonical: 'https://nandayure.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.className} ${titleFont.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <meta name="geo.region" content="CR" />
        <meta name="geo.placename" content="San José" />
      </head>
      <body>
        <JsonLdSchema type="Organization" data={organizationSchema} />
        <SessionProvider>
          <QueryProvider>
            <Toaster reverseOrder={false} />
            {/* Valida la sesión cada 5 segundos en toda la app */}
            <SessionValidationWatcher />
            {children}
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
