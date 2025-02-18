'use client';

import React from 'react';
import { useGetRoles } from '@/hooks';
import { navLinksRH, navLinksUser, navLinksVA } from './navLinks';
import { MobileSidebar } from './mobile-side-bar';
import { DesktopSidebar } from './desktop-side-bar';
import { SidebarSkeleton } from './skeleton-loader';
import { useSidebarStore } from '@/store/useSidebarStore';

// Objeto de caché para almacenar los navLinks según el rol.
const navLinksCache: Record<string, any> = {};

function getSelectedNavLinks(userRoles: string[]) {
  if (userRoles.includes('RH')) {
    if (!navLinksCache['RH']) {
      navLinksCache['RH'] = navLinksRH;
    }
    return navLinksCache['RH'];
  } else if (userRoles.includes('VA')) {
    if (!navLinksCache['VA']) {
      navLinksCache['VA'] = navLinksVA;
    }
    return navLinksCache['VA'];
  } else if (userRoles.includes('USER')) {
    if (!navLinksCache['USER']) {
      navLinksCache['USER'] = navLinksUser;
    }
    return navLinksCache['USER'];
  }
  return {};
}

export function Sidebar() {
  const { roles, status } = useGetRoles();
  const { isOpen } = useSidebarStore();

  if (status === 'loading') {
    return <SidebarSkeleton isOpen={isOpen} />;
  }

  const userRoles = roles || [];
  const selectedNavLinks = getSelectedNavLinks(userRoles);

  return (
    <>
      {/* Sidebar Móvil */}
      <div className="md:hidden">
        <MobileSidebar navLinks={selectedNavLinks} />
      </div>

      {/* Sidebar de Escritorio */}
      <div className="hidden md:block">
        <DesktopSidebar navLinks={selectedNavLinks} />
      </div>
    </>
  );
}

export default Sidebar;
