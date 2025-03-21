import {
  BarChart3,
  ChartPie,
  Clock,
  FileText,
  Folder,
  Home,
  ListTodo,
  Mail,
  ScrollText,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SubLink {
  href: string;
  label: string;
  dataCy?: string;
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
    dataCy: 'sidebar-dashboard-home',
  },
  gestionDocumentos: {
    href: '/document-management/digital-files',
    icon: FileText,
    label: 'Documentos digitales',
    dataCy: 'sidebar-dashboard-digital-documents',
  },
  gestionSolicitudes: {
    href: '/request-management',
    icon: ListTodo,
    label: 'Gestión de Solicitudes',
    dataCy: 'sidebar-dashboard-request-management',
  },
  Solicitudes: {
    href: '/request',
    icon: ScrollText,
    label: 'Tipos de Solicitudes',
    dataCy: 'sidebar-dashboard-requests',
    subLinks: {
      solicitudVacaciones: {
        href: '/request/vacation-request',
        label: 'Solicitud de vacaciones',
        dataCy: 'sidebar-dashboard-vacation-request',
      },
      boletaPago: {
        href: '/request/pay-slip',
        label: 'Boleta de pago',
        dataCy: 'sidebar-dashboard-pay-slip',
      },
      constanciaSalarial: {
        href: '/request/salary-certificate',
        label: 'Constancia salarial',
        dataCy: 'sidebar-dashboard-salary-certificate',
      },
    },
  },
  miSolicitudes: {
    href: '/request-management/my-requests',
    icon: Mail,
    label: 'Mis solicitudes',
    dataCy: 'sidebar-dashboard-my-requests',
  },
  controlMarcas: {
    href: '/time-tracking',
    icon: Clock,
    label: 'Control de marcas',
    dataCy: 'sidebar-dashboard-time-tracking',
  },
  miExpediente: {
    href: '/my-file',
    icon: Folder,
    label: 'Mis Documentos',
    dataCy: 'sidebar-dashboard-my-documents',
  },
  analiticas: {
    href: '/hr-analytics',
    icon: ChartPie,
    label: 'Analíticas',
    dataCy: 'sidebar-dashboard-analytics',
    subLinks: {
      resumenRRHH: {
        href: '/hr-analytics/hr-requests-summary',
        label: 'Resumen RRHH',
        dataCy: 'sidebar-dashboard-hr-requests-summary',
      },
      tiemposAprobacion: {
        href: '/hr-analytics/peak-request-times',
        label: 'Horas Pico',
        dataCy: 'sidebar-dashboard-approval-times',
      },
    },
  },
};

export const navLinksRH: Record<string, NavLink> = {
  home: baseNavLinks.home,
  miSolicitudes: baseNavLinks.miSolicitudes,
  Solicitudes: baseNavLinks.Solicitudes,
  miExpediente: baseNavLinks.miExpediente,
  gestionSolicitudes: baseNavLinks.gestionSolicitudes,
  gestionDocumentos: baseNavLinks.gestionDocumentos,
  analiticas: baseNavLinks.analiticas,
};

export const navLinksUser: Record<string, NavLink> = {
  home: baseNavLinks.home,
  miSolicitudes: baseNavLinks.miSolicitudes,
  Solicitudes: baseNavLinks.Solicitudes,
  miExpediente: baseNavLinks.miExpediente,
};

export const navLinksVA: Record<string, NavLink> = {
  home: baseNavLinks.home,
  miSolicitudes: baseNavLinks.miSolicitudes,
  Solicitudes: baseNavLinks.Solicitudes,
  miExpediente: baseNavLinks.miExpediente,
  gestionSolicitudes: baseNavLinks.gestionSolicitudes,
  analiticas: baseNavLinks.analiticas,
};