'use client';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { NavLink, NavLinks } from '@/components/common/nav-links';
import { useSidebarStore } from '@/store/useSidebarStore';
import {
  Briefcase,
  GraduationCap,
  Home,
  List,
  User,
  Banknote,
  Layers,
  Building,
  Menu,
  X,
} from 'lucide-react';

const navLinks: Record<string, NavLink> = {
  inicio: {
    href: '/',
    icon: Home,
    label: 'Inicio',
  },
  configuracionGeneral: {
    href: '/system-configuration/general-settings',
    icon: List,
    label: 'Configuración General', 
  },
  departamentos: {
    href: '/system-configuration/departments',
    icon: Building,
    label: 'Departamentos',
  },
  puestosDeTrabajo: {
    href: '/system-configuration/positions',
    icon: Briefcase,
    label: 'Puestos de trabajo',
  },
  anualidades: {
    href: '/system-configuration/annuities',
    icon: Banknote,
    label: 'Anualidades',
  },
  institucionesFinacieras: {
    href: '/system-configuration/financial-institutions',
    icon: Layers,
    label: 'Instituciones Financieras',
  },
  estudios: {
    href: '/system-configuration/studies',
    icon: GraduationCap,
    label: 'Estudios',
  },
};
export function SideBarSystemConfiguration() {
  const { isOpen, MenuIsOpen, MenuIsClose } = useSidebarStore();

  const toggleSidebar = () => {
    isOpen ? MenuIsClose() : MenuIsOpen();
  };
  return (
    <aside
      className={clsx(
        'flex flex-col h-auto transition-all duration-300 bg-white border rounded border-gray-200',
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

      <Link
        className="mb-2 flex h-20 items-center justify-center rounded-md p-4 md:h-40"
        href="/"
      >
        <Image
          src="/LogoMuni.png"
          alt="logo"
          width={100}
          height={100}
          priority
        />
      </Link>

      <nav
        className={clsx('flex flex-col flex-grow', !isOpen && 'items-center')}
      >
        <NavLinks isOpen={isOpen} navLinks={navLinks} />
      </nav>
    </aside>
  );
}
