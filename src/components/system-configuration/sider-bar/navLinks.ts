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
