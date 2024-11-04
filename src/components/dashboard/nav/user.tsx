'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGetRoles } from '@/hooks';
import { CircleUserRound, Settings, UserPlus, HelpCircle, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function User() {
  const { roles } = useGetRoles();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
          <CircleUserRound className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Mi perfil</p>
            <p className="text-xs leading-none text-muted-foreground">
              Gestiona tu cuenta
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Configuración</span>
          </Link>
        </DropdownMenuItem>
        {roles && roles.includes('RH') && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/system-configuration" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración del sistema</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/auth/register" className="flex items-center">
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Registrar usuario</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem asChild>
          <Link href="/helps" className="flex items-center">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Ayuda</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center text-red-600 focus:text-red-600"
          onSelect={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
