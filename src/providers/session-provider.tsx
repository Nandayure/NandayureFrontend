'use client';

import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { ReactNode } from 'react';

/**
 * AuthProvider: Provee el contexto de autenticación para la aplicación
 * Envuelve los componentes hijos con el SessionProvider de NextAuth.js
 */
export default function AuthProvider({
  children,
  session,
  refetchInterval = 0,
  refetchOnWindowFocus = true,
}: {
  children: ReactNode;
  session?: SessionProviderProps['session'];
  refetchInterval?: number;
  refetchOnWindowFocus?: boolean;
}) {
  return (
    <SessionProvider
      session={session}
      refetchInterval={refetchInterval}
      refetchOnWindowFocus={refetchOnWindowFocus}
    >
      {children}
    </SessionProvider>
  );
}