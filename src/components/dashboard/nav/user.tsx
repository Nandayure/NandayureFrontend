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
import { CircleUserRound } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function User() {
  const { roles } = useGetRoles();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <CircleUserRound strokeWidth={1.5} size={24} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Mi perfil</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/profile">Configuración </Link>
        </DropdownMenuItem>
        {roles && roles.includes('RH') && (
          <>
            <DropdownMenuItem>
              <Link href={'/system-configuration'}>
                Configuracion del sistema
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/auth/register'}>Registrar usuario</Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuItem>
          <Link href="/helps">Ayuda</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button onClick={() => signOut()} className="w-full text-left">
            Cerrar sesión
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
