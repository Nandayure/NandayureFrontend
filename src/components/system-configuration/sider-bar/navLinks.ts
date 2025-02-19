import {
  Briefcase,
  GraduationCap,
  Home,
  List,
  Banknote,
  Layers,
  Building,
} from 'lucide-react';
import { NavLink } from '@/components/common/nav-links';

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
  anualidades: {
    href: '/system-configuration/annuities',
    icon: Banknote,
    label: 'Anualidades',
    dataCy: 'sidebar-system-configuration-annuities',
  },
  institucionesFinacieras: {
    href: '/system-configuration/financial-institutions',
    icon: Layers,
    label: 'Instituciones Financieras',
    dataCy: 'sidebar-system-configuration-financial-institutions',
  },
  estudios: {
    href: '/system-configuration/studies',
    icon: GraduationCap,
    label: 'Estudios',
    dataCy: 'sidebar-system-configuration-studies',
  },
};
