'use client';

import React from 'react';
import { navLinks } from './navLinks'; // Adjust the import path as needed
import { MobileSidebar } from '@/components/side-bar/mobile-side-bar';
import { DesktopSidebar } from '@/components/side-bar/desktop-side-bar';

export function SideBarSystemConfiguration() {
  return (
    <>
      <MobileSidebar navLinks={navLinks} />
      <DesktopSidebar navLinks={navLinks} />
    </>
  );
}
