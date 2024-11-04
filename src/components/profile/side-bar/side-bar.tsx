'use client';

import React from 'react';
import { MobileSidebarProfile } from './mobile-side-bar';
import { navLinks } from './navLinks';
import { DesktopSidebarProfile } from './desktop-side.bar';

export function SideBarProfile() {
  return (
    <>
      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <MobileSidebarProfile navLinks={navLinks} />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <DesktopSidebarProfile navLinks={navLinks} />
      </div>
    </>
  );
}
