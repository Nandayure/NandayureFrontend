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

interface MobileSidebarProfileProps {
  navLinks: Record<string, NavLink>;
}

export function MobileSidebarProfile({ navLinks }: MobileSidebarProfileProps) {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6 mt-4" />
          <span className="sr-only">Open Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle asChild>
            <div className="flex items-center p-2">
              <Image
                src="/LogoMuni.png"
                alt="logo"
                width={80}
                height={80}
                priority
              />
              <span className="ml-2 font-semibold text-lg">Dashboard</span>
            </div>
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col space-y-2">
          <NavLinks
            isOpen={true}
            navLinks={navLinks}
            onLinkClick={handleLinkClick}
          />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
