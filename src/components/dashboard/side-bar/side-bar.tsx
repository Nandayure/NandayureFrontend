'use client';
import React from 'react';
import { NavLink, NavLinks } from '../../common/nav-links';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import {
  Clock,
  FileText,
  Folder,
  Home,
  Menu,
  PanelTopOpen,
  SquarePen,
  UserCheck,
  X,
} from 'lucide-react';
import { useSidebarStore } from '@/store/useSidebarStore';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import { useGetRoles } from '@/hooks';

const navLinksRH: Record<string, NavLink> = {
  home: {
    href: '/',
    icon: Home,
    label: 'Inicio',
  },
  creacionPlanillas: {
    href: '/payroll-creation',
    icon: FileText,
    label: 'Creación de planillas',
  },
  gestionDocumentos: {
    href: '/document-management',
    icon: Folder,
    label: 'Gestión de documentos',
    subLinks: {
      ExpedientesDigitales: {
        href: '/document-management/digital-files',
        label: 'Documentos digitales',
      },
      Planillas: {
        href: '/document-management/payrolls',
        label: 'Planillas',
      },
    },
  },
  gestionSolicitudes: {
    href: '/request-management',
    icon: UserCheck,
    label: 'Gestión de solicitudes',
  },
  Solicitudes: {
    href: '/request',
    icon: SquarePen,
    label: 'Solicitudes',
    subLinks: {
      solicitudVacaciones: {
        href: '/request/vacation-request',
        label: 'Solicitud de vacaciones',
      },
      boletaPago: {
        href: '/request/pay-slip',
        label: 'Boleta de pago',
      },
      constanciaSalarial: {
        href: '/request/salary-certificate',
        label: 'Constancia salarial',
      },
    },
  },
  miSolicitudes: {
    href: '/request-management/my-requests',
    icon:  PanelTopOpen,
    label: 'Mis solicitudes',
  },
  controlMarcas: {
    href: '/time-tracking',
    icon: Clock,
    label: 'Control de marcas',
  },
};

// Enlaces de navegación para USER
const navLinksUser: Record<string, NavLink> = {
  home: {
    href: '/',
    icon: Home,
    label: 'Inicio',
  },
  miExpediente: {
    href: '/my-file',
    icon: Folder,
    label: 'Mi expediente',
  },
  gestionSolicitudes: {
    href: '/request-management',
    icon: UserCheck,
    label: 'Solicitudes',
    subLinks: {
      solicitudVacaciones: {
        href: '/request/vacation-request',
        label: 'Solicitud de vacaciones',
      },
      boletaPago: {
        href: '/request/pay-slip',
        label: 'Boleta de pago',
      },
      constanciaSalarial: {
        href: '/request/salary-certificate',
        label: 'Constancia salarial',
      },
    },
  },
  miSolicitudes: {
    href: '/request-management/my-requests',
    icon: PanelTopOpen,
    label: 'Mis solicitudes',
  },
};

export function SidebarDashboard() {
  const { isOpen, MenuIsOpen, MenuIsClose } = useSidebarStore();
  const { roles, status } = useGetRoles();

  if (status === 'loading') {
    return (
      <aside
        className={clsx(
          'flex flex-col h-screen transition-all duration-300 p-4  bg-white border rounded border-gray-200',
          isOpen ? 'w-64' : 'w-20 items-center',
        )}
      >
        <div className="flex items-center p-2">
          <SkeletonLoader className="w-10 h-10 rounded-full" />
        </div>
        <div className="mb-2 flex h-20 items-center justify-center rounded-md p-4 md:h-40">
          <SkeletonLoader className="w-20 h-20" />
        </div>
        <nav
          className={clsx('flex flex-col flex-grow', !isOpen && 'items-center')}
        >
          <SkeletonLoader className="w-full h-6 mb-2" />
          <SkeletonLoader className="w-full h-6 mb-2" />
          <SkeletonLoader className="w-full h-6 mb-2" />
          <SkeletonLoader className="w-full h-6 mb-2" />
          <SkeletonLoader className="w-full h-6 mb-2" />
          <SkeletonLoader className="w-full h-6 mb-2" />
          <SkeletonLoader className="w-full h-6 mb-2" />
          <SkeletonLoader className="w-full h-6 mb-2" />
          <SkeletonLoader className="w-full h-6 mb-2" />
        </nav>
      </aside>
    );
  }

  // Determinar el conjunto de enlaces de navegación basado en el rol
  const selectedNavLinks = roles.includes('RH')
    ? navLinksRH
    : roles.includes('USER')
    ? navLinksUser
    : {};

  const toggleSidebar = () => {
    isOpen ? MenuIsClose() : MenuIsOpen();
  };

  return (
    <aside
      className={clsx(
        'flex flex-col h-screen transition-all duration-300 bg-white border rounded border-gray-200',
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
        <NavLinks isOpen={isOpen} navLinks={selectedNavLinks} />
      </nav>
    </aside>
  );
}

export default SidebarDashboard;
