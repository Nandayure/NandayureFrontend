'use client';

import { titleFont } from '@/config/fonts';
import { useSession } from 'next-auth/react';
import React from 'react';
import User from './user';
import InboxComponent from './inbox/inbox';
import { Skeleton } from '@/components/ui/skeleton';

export default function Component() {
  const { data: session, status } = useSession();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 sm:h-16">
          {/* Título para desktop */}
          <div className="hidden sm:flex flex-shrink-0 flex-grow">
            <h1
              className={`text-2xl font-bold text-gray-900 ${titleFont.className}`}
            >
              Recursos Humanos Nandayure
            </h1>
          </div>

          {/* Título para móvil */}
          <div className="sm:hidden flex-shrink-0 flex-grow">
            <h1
              className={`text-lg font-bold text-gray-900 ${titleFont.className}`}
            >
              RH Nandayure
            </h1>
          </div>

          {/* Sección de usuario y notificaciones */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Muestra un esqueleto mientras carga */}
            {status === 'loading' ? (
              <Skeleton className="h-6 w-[100px] sm:w-[150px]" />
            ) : status === 'authenticated' && session?.user ? (
              <span className="text-xs sm:text-sm font-medium text-gray-700 max-w-[120px] sm:max-w-none truncate ml-2">
                {session.user.email || session.user.name || 'Usuario'}
              </span>
            ) : null}


            {/* Component de Inbox para desktop */}
            <div className="hidden sm:block">
              <InboxComponent />
            </div>

            <User />
          </div>
        </div>
      </div>
    </nav>
  );
}
