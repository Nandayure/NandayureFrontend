'use client';

import React from 'react';
import { navLinks } from './navLinks'; // Adjust the import path as needed
import { SideBarSystemConfigurationDesktop } from './desktop-side-bar';
import { SideBarSystemConfigurationMobile } from './mobile-side-bar';

export function SideBarSystemConfiguration() {
  return (
    <>
      <SideBarSystemConfigurationDesktop navLinks={navLinks} />
      <SideBarSystemConfigurationMobile navLinks={navLinks} />
    </>
  );
}
