import { Roles } from "@/constants/roles/roles";

/**
 * Rutas públicas que no requieren autenticación
 */
export const PUBLIC_ROUTES: string[] = [
  '/auth/login',
  '/auth/forgot-password',
  '/auth/*',
  '/auth/reset-password',
  '/auth/session-expired',
];

/**
 * Rutas comunes que todos los roles pueden acceder
 */
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
  '/helps',
];

/**
 * Tipo para las rutas basadas en roles
 */
export type RoleRoutes = Record<string, string[]>;

/**
 * Configuración de rutas permitidas por rol
 */
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
    '/hr-analytics/hr-requests-summary',
    '/hr-analytics/peak-request-times',
    '/helps/faqs-management',
  ],
  // VA para Alcalde
  VA: [...commonRoutes,
    '/hr-analytics/hr-requests-summary',
    '/hr-analytics/peak-request-times',
  ],
};

/**
 * Determina si la ruta solicitada es pública.
 * @param path Ruta a verificar
 */
export function isPublicRoute(path: string): boolean {
  // Verificación exacta primero
  if (PUBLIC_ROUTES.includes(path)) {
    return true;
  }

  // Verificación con comodines
  return PUBLIC_ROUTES.some(route => {
    if (route.includes('*')) {
      const prefix = route.split('*')[0];
      return path.startsWith(prefix);
    }
    return false;
  });
}

/**
 * Chequea si una ruta (path) concuerda con el patrón dado.
 * Soporta comodín '*' al final.
 * @param path Ruta a verificar
 * @param pattern Patrón a comparar
 */
export function routeMatches(path: string, pattern: string): boolean {
  if (pattern.includes('*')) {
    const prefix = pattern.split('*')[0];
    return path.startsWith(prefix);
  }
  return path === pattern;
}