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
  dataCy?: string; 
  subLinks?: Record<string, SubLink>;
}

export const baseNavLinks: Record<string, NavLink> = {
  home: {
    href: '/',
    icon: Home,
    label: 'Inicio',
    dataCy: 'nav-home',
  },
  gestionDocumentos: {
    href: '/document-management/digital-files',
    icon: Folder,
    label: 'Documentos digitales',
    dataCy: 'nav-gestion-documentos',
  },
  gestionSolicitudes: {
    href: '/request-management',
    icon: UserCheck,
    label: 'Gestión de solicitudes',
    dataCy: 'nav-gestion-solicitudes',
  },
  Solicitudes: {
    href: '/request',
    icon: SquarePen,
    label: 'Solicitudes',
    dataCy: 'nav-solicitudes',
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
    dataCy: 'nav-mi-solicitudes',
  },
  controlMarcas: {
    href: '/time-tracking',
    icon: Clock,
    label: 'Control de marcas',
    dataCy: 'nav-control-marcas',
  },
  miExpediente: {
    href: '/my-file',
    icon: Folder,
    label: 'Mis Documentos',
    dataCy: 'nav-mi-expediente',
  },
};

// Se conforman los navLinks por rol extrayendo del objeto base
export const navLinksRH: Record<string, NavLink> = {
  home: baseNavLinks.home,
  gestionDocumentos: baseNavLinks.gestionDocumentos,
  gestionSolicitudes: baseNavLinks.gestionSolicitudes,
  Solicitudes: baseNavLinks.Solicitudes,
  miSolicitudes: baseNavLinks.miSolicitudes,
  controlMarcas: baseNavLinks.controlMarcas,
};

export const navLinksUser: Record<string, NavLink> = {
  home: baseNavLinks.home,
  miExpediente: baseNavLinks.miExpediente,
  gestionSolicitudes: baseNavLinks.gestionSolicitudes,
  miSolicitudes: baseNavLinks.miSolicitudes,
};

export const navLinksVA: Record<string, NavLink> = {
  home: baseNavLinks.home,
  Solicitudes: baseNavLinks.Solicitudes,
  miSolicitudes: baseNavLinks.miSolicitudes,
};
