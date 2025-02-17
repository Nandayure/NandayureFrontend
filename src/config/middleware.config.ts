import { Roles } from "@/lib/constants";


export const PUBLIC_ROUTES: string[] = [
  '/auth/login',
  '/auth/forgot-password'
];

export type RoleRoutes = Record<string, string[]>;

export const ROLE_ROUTES: RoleRoutes = {
  [Roles.user]: [
    '/',
    '/my-file',
    '/request/vacation-request',
    '/request/pay-slip',
    '/request/salary-certificate',
    '/request-management/my-requests',
    '/profile',
    '/security'
  ],
  [Roles.rh]: [
    '/',
    '/my-file',
    '/request/vacation-request',
    '/request/pay-slip',
    '/request/salary-certificate',
    '/request-management/my-requests',
    '/profile',
    '/security',
    '/document-management/*',
    '/request-management/*',
    '/time-tracking',
    '/system-configuration/*',
    '/auth/register'
  ],
  // VA para Alcalde
  VA: [
    '/',
    '/my-file',
    '/request/vacation-request',
    '/request/pay-slip',
    '/request/salary-certificate',
    '/request-management/my-requests',
    '/profile',
    '/security',
    '/request-management/*'
  ]
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