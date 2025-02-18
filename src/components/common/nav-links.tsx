import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

export interface SubLink {
  href: string;
  label: string;
  dataCy?: string;
}

export interface NavLink {
  href: string;
  icon: React.ElementType;
  label: string;
  dataCy?: string;
  subLinks?: Record<string, SubLink>;
}

interface Props {
  isOpen: boolean;
  navLinks: Record<string, NavLink>;
  onLinkClick?: () => void;
}

export function NavLinks({ isOpen, navLinks, onLinkClick }: Props) {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <div className="flex flex-col space-y-2">
      {Object.entries(navLinks).map(([key, link]) => {
        const isActive = pathname === link.href;

        if (link.subLinks) {
          const hasSubLinks = link.subLinks && Object.keys(link.subLinks).length > 0;

          return (
            <div key={key}>
              <Button
                data-cy={link.dataCy}
                variant="ghost"
                className="flex items-center justify-between w-full"
                onClick={() => setOpenSubMenu(openSubMenu === key ? null : key)}
              >
                <link.icon
                  className={clsx(
                    'mr-2 h-5 w-5',
                    isActive ? 'text-blue-600' : 'text-gray-700',
                  )}
                />
                {isOpen && (
                  <span
                    className={clsx(
                      'flex-grow text-left text-md',
                      isActive ? 'text-blue-600' : 'text-gray-700',
                    )}
                  >
                    {link.label}
                  </span>
                )}
                {isOpen &&
                  (openSubMenu === key ? (
                    <ChevronDown className="ml-2 h-4 w-4 text-gray-700" />
                  ) : (
                    <ChevronRight className="ml-2 h-4 w-4 text-gray-700" />
                  ))}
              </Button>
              {isOpen && openSubMenu === key && (
                <div className="pl-6 mt-2 space-y-2">
                  {hasSubLinks &&
                    Object.entries(link.subLinks!).map(([subKey, subLink]) => {
                      const isSubLinkActive = pathname === subLink.href;

                      return (
                        <Button
                          key={subKey}
                          data-cy={subLink.dataCy} 
                          variant="ghost"
                          size="sm"
                          className="w-full flex items-center justify-start"
                          asChild
                          onClick={onLinkClick}
                        >
                          <Link href={subLink.href}>
                            <span
                              className={clsx(
                                'text-left text-md',
                                isSubLinkActive
                                  ? 'text-blue-600 font-semibold'
                                  : 'text-gray-700',
                              )}
                            >
                              {subLink.label}
                            </span>
                          </Link>
                        </Button>
                      );
                    })}
                </div>
              )}
            </div>
          );
        }

        return (
          <Button
            key={key}
            data-cy={link.dataCy} 
            variant="ghost"
            className="flex items-center justify-start w-full"
            asChild
            onClick={onLinkClick}
          >
            <Link href={link.href}>
              <link.icon
                className={clsx(
                  'mr-2 h-5 w-5',
                  isActive ? 'text-blue-600' : 'text-gray-700',
                )}
              />
              {isOpen && (
                <span
                  className={clsx(
                    'text-left text-md',
                    isActive ? 'text-blue-600 font-semibold' : 'text-gray-700',
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
