import { Fingerprint, Home, UserRoundPen } from 'lucide-react';
import { NavLink } from '@/components/common/nav-links';

export const navLinks: Record<string, NavLink> = {
  home: {
    href: '/',
    icon: Home,
    label: 'Inicio',
  },
  Profile: {
    href: '/profile',
    icon: UserRoundPen,
    label: 'Perfil',
  },
  Seguridad: {
    href: '/security',
    icon: Fingerprint,
    label: 'Seguridad',
  },
};
