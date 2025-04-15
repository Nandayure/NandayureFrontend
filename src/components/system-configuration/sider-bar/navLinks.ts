import {
  Briefcase,
  GraduationCap,
  Home,
  List,
  Banknote,
  Layers,
  Building,
  Calendar,
} from 'lucide-react';
import { NavLink } from '@/components/side-bar/nav-links';

export const navLinks: Record<string, NavLink> = {
  inicio: {
    href: '/',
    icon: Home,
    label: 'Inicio',
    dataCy: 'sidebar-system-configuration-home',
  },
  configuracionGeneral: {
    href: '/system-configuration/general-settings',
    icon: List,
    label: 'Configuración General',
    dataCy: 'sidebar-system-configuration-general-settings',
  },
  departamentos: {
    href: '/system-configuration/departments',
    icon: Building,
    label: 'Departamentos',
    dataCy: 'sidebar-system-configuration-departments',
  },
  puestosDeTrabajo: {
    href: '/system-configuration/positions',
    icon: Briefcase,
    label: 'Puestos de trabajo',
    dataCy: 'sidebar-system-configuration-positions',
  },
  estudios: {
    href: '/system-configuration/studies',
    icon: GraduationCap,
    label: 'Estudios',
    dataCy: 'sidebar-system-configuration-studies',
  },
  feriados: {
    href: '/system-configuration/holidays',
    icon: Calendar,
    label: 'Feriados',
    dataCy: 'sidebar-system-configuration-holidays',
  },
};
