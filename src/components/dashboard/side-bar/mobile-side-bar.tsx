'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { NavLink, NavLinks } from '@/components/common/nav-links';

interface MobileSidebarProps {
  navLinks: Record<string, NavLink>;
}

export function MobileSidebar({ navLinks }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5 mt-4" />
            <span className="sr-only">Abrir Menú</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle asChild>
              <div className="flex items-center p-2">
                <Image
                  src="/LogoMuni.png"
                  alt="logo"
                  width={100}
                  height={100}
                  priority
                />
                <span className="ml-2 font-semibold text-lg">Dashboard</span>
              </div>
            </SheetTitle>
          </SheetHeader>
          <nav className="mt-8 flex flex-col space-y-2">
            <NavLinks isOpen={true} navLinks={navLinks} onLinkClick={handleLinkClick} />
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
