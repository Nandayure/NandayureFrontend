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
import {
  User as UserIcon,
  UserCog,
  Database,
  UserPlus,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function User() {
  const { roles } = useGetRoles();
  const { data: session, status } = useSession()
  const name = session?.user.name

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full p-0 m-0 border cursor-pointer"
          data-cy="user-menu"
        >
          <Avatar >
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
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
        <DropdownMenuItem
          asChild
          data-cy="profile-button"
        >
          <Link href="/profile" className="flex items-center">
            <UserCog className="mr-2 h-4 w-4" />
            <span>Configuración de perfil</span>
          </Link>
        </DropdownMenuItem>
        {roles && roles.includes('RH') && (
          <>
            <DropdownMenuItem
              data-cy="system-configuration-button"
              asChild
            >
              <Link href="/system-configuration" className="flex items-center">
                <Database className="mr-2 h-4 w-4" />
                <span>Administración de Catálogos</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              data-cy="register-user-button"
              asChild
            >
              <Link href="/auth/register" className="flex items-center">
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Registrar usuario</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              data-cy="user-management-button"
              asChild
            >
              <Link href="/user-management" className="flex items-center">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Gestión de usuarios</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem
          data-cy="help-button"
          asChild
        >
          <Link href="/helps" className="flex items-center">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Ayuda</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center text-red-600 focus:text-red-600"
          onSelect={() => signOut()}
          data-cy="logout-button"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}