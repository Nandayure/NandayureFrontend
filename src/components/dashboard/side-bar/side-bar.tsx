'use client';

import { useGetRoles } from '@/hooks';
import React from 'react';
import { navLinksRH, navLinksUser, navLinksVA } from './navLinks';
import { MobileSidebar } from './mobile-side-bar';
import { DesktopSidebar } from './desktop-side-bar';
import { SidebarSkeleton } from './skeleton-loader';
import { useSidebarStore } from '@/store/useSidebarStore';

export function Sidebar() {
  const { roles, status } = useGetRoles();
  const { isOpen } = useSidebarStore();

  if (status === 'loading') {
    return <SidebarSkeleton isOpen={isOpen} />;
  }

  const userRoles = roles || [];
  const selectedNavLinks = userRoles.includes('RH')
    ? navLinksRH
    : userRoles.includes('VA')
    ? navLinksVA
    : userRoles.includes('USER')
    ? navLinksUser
    : {};
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
