'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useSidebarStore } from '@/store/useSidebarStore';

import { NavLinks, NavLink } from '@/components/common/nav-links';

interface DesktopSidebarProps {
  navLinks: Record<string, NavLink>;
}

export function DesktopSidebar({ navLinks }: DesktopSidebarProps) {
  const { isOpen, MenuIsOpen, MenuIsClose } = useSidebarStore();

  const toggleSidebar = () => {
    isOpen ? MenuIsClose() : MenuIsOpen();
  };

  return (
    <aside
      className={clsx(
        'hidden md:flex flex-col h-screen transition-all duration-300 bg-white border-r border-gray-200',
        isOpen ? 'w-64' : 'w-20 items-center',
      )}
    >
      <div className="flex items-center p-2">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-200"
          aria-label="Toggle Sidebar"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <Link href="/" className="mb-2 flex h-20 items-center justify-center p-4">
        <Image src="/LogoMuni.png" alt="logo" width={100} height={100} priority />
      </Link>

      <nav className={clsx('flex flex-col flex-grow mt-3', !isOpen && 'items-center')}>
        <NavLinks isOpen={isOpen} navLinks={navLinks} />
      </nav>
    </aside>
  );
}
