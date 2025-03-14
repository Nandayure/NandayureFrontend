'use client';

import React from 'react';
import { navLinks } from './navLinks';
import { MobileSidebar } from '@/components/side-bar/mobile-side-bar';
import { DesktopSidebar } from '@/components/side-bar/desktop-side-bar';

export function SideBarProfile() {
  return (
    <>
      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <MobileSidebar navLinks={navLinks} />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <DesktopSidebar navLinks={navLinks} />
      </div>
    </>
  );
}
