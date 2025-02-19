'use client';

import React, { useMemo } from 'react';
import { useGetRoles } from '@/hooks';
import { navLinksRH, navLinksUser, navLinksVA } from './navLinks';
import { MobileSidebar } from './mobile-side-bar';
import { DesktopSidebar } from './desktop-side-bar';
import { SidebarSkeleton } from './skeleton-loader';
import { useSidebarStore } from '@/store/useSidebarStore';

function getSelectedNavLinks(userRoles: string[]) {
  if (userRoles.includes('RH')) {
    return navLinksRH;
  } else if (userRoles.includes('VA')) {
    return navLinksVA;
  } else if (userRoles.includes('USER')) {
    return navLinksUser;
  }
  return {};
}
export function Sidebar() {
  const { roles, status } = useGetRoles();
  const { isOpen } = useSidebarStore();

  const selectedNavLinks = useMemo(() => {
    const userRoles = roles || [];
    return getSelectedNavLinks(userRoles);
  }, [roles]);

  if (status === 'loading') {
    return <SidebarSkeleton isOpen={isOpen} />;
  }
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
