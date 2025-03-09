import { Roles } from '@/lib/constants';

// Rutas públicas
export const PUBLIC_ROUTES: string[] = [
  '/auth/login',
  '/auth/forgot-password',
  '/auth/*',
  '/auth/reset-password',
  '/auth/session-expired',
];

// Rutas comunes (intersección entre todos los roles)
export const commonRoutes: string[] = [
  '/',
  '/my-file',
  '/my-file/*',
  '/request/vacation-request',
  '/request/pay-slip',
  '/request/salary-certificate',
  '/request-management/my-requests',
  '/profile',
  '/security',
];

export type RoleRoutes = Record<string, string[]>;

export const ROLE_ROUTES: RoleRoutes = {
  [Roles.user]: [...commonRoutes],
  [Roles.rh]: [
    ...commonRoutes,
    '/document-management/*',
    '/request-management',
    '/request-management/*',
    '/request/vacation-request/*',
    '/request/pay-slip/*',
    '/request/salary-certificate/*',
    '/time-tracking',
    '/system-configuration/*',
    '/system-configuration',
    '/auth/register',
  ],
  // VA para Alcalde
  VA: [...commonRoutes, '/request-management'],
};

/**
 * Determina si la ruta solicitada es pública.
 */
export function isPublicRoute(path: string): boolean {
  return PUBLIC_ROUTES.includes(path);
}

/**
 * Chequea si una ruta (path) concuerda con el patrón dado.
 * Soporta comodín '*' al final.
 */
export function routeMatches(path: string, pattern: string): boolean {
  if (pattern.includes('*')) {
    const prefix = pattern.split('*')[0];
    return path.startsWith(prefix);
  }
  return path === pattern;
}
