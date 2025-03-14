import { Fingerprint, Home, UserRoundPen } from 'lucide-react';
import { NavLink } from '@/components/side-bar/nav-links';

export const navLinks: Record<string, NavLink> = {
  home: {
    href: '/',
    icon: Home,
    label: 'Inicio',
    dataCy: 'sidebar-profile-home',
  },
  Profile: {
    href: '/profile',
    icon: UserRoundPen,
    label: 'Perfil',
    dataCy: 'sidebar-profile-profile',
  },
  Seguridad: {
    href: '/security',
    icon: Fingerprint,
    label: 'Seguridad',
    dataCy: 'sidebar-profile-security',
  },
};
