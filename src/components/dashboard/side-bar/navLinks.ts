import {
  Clock,
  Folder,
  Home,
  LucideIcon,
  PanelTopOpen,
  SquarePen,
  UserCheck,
} from 'lucide-react';

export interface SubLink {
  href: string;
  label: string;
}

export interface NavLink {
  href: string;
  icon: LucideIcon;
  label: string;
  subLinks?: Record<string, SubLink>;
}

interface Props {
  isOpen: boolean;
  navLinks: Record<string, NavLink>;
}

export const navLinksRH: Record<string, NavLink> = {
  home: { href: '/', icon: Home, label: 'Inicio' },
  gestionDocumentos: {
    href: '/document-management/digital-files',
    icon: Folder,
    label: 'Documentos digitales',
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
    icon: PanelTopOpen,
    label: 'Mis solicitudes',
  },
  controlMarcas: {
    href: '/time-tracking',
    icon: Clock,
    label: 'Control de marcas',
  },
};

export const navLinksUser: Record<string, NavLink> = {
  home: { href: '/', icon: Home, label: 'Inicio' },
  miExpediente: { href: '/my-file', icon: Folder, label: 'Mis Documentos' },
  gestionSolicitudes: {
    href: '/request-management',
    icon: UserCheck,
    label: 'Solicitudes',
    subLinks: {
      solicitudVacaciones: {
        href: '/request/vacation-request',
        label: 'Solicitud de vacaciones',
      },
      boletaPago: { href: '/request/pay-slip', label: 'Boleta de pago' },
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

export const navLinksVA: Record<string, NavLink> = {
  home: { href: '/', icon: Home, label: 'Inicio' },
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
    icon: PanelTopOpen,
    label: 'Mis solicitudes',
  },
};
