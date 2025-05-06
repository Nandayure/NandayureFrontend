import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { jwtDecode } from 'jwt-decode';
import { Payload } from './types/auth/authResponseTypes';
import {
  ROLE_ROUTES,
  isPublicRoute,
  routeMatches,
} from './config/middleware.config';
import { Roles } from './constants/roles/roles';

/**
 * Middleware principal para Next.js 15
 * Gestiona la autenticación y autorización de rutas basadas en roles
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Permitir recursos estáticos
  if (pathname.startsWith('/_next') || pathname.startsWith('/static')) {
    return NextResponse.next();
  }

  // 2. Permitir rutas públicas
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // 3. Verificar autenticación
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // 4. Obtener y verificar roles del usuario
  try {
    const tokenDecoded: Payload | null = jwtDecode(
      session.access_token as string,
    );

    if (!tokenDecoded?.roles?.length) {
      console.error('Token inválido o sin roles');
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // 5. Administradores tienen acceso total
    if (tokenDecoded.roles.includes(Roles.ti)) {
      return NextResponse.next();
    }

    // 6. Verificar permisos según rol
    if (hasRoutePermission(pathname, tokenDecoded.roles)) {
      return NextResponse.next();
    }

    // 7. Sin permiso, redirigir a página no autorizada
    return NextResponse.redirect(new URL('/unauthorized', req.url));

  } catch (error) {
    console.error('Error al procesar el token:', error);
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
}

/**
 * Verifica si el usuario tiene permiso para acceder a la ruta solicitada
 * basado en sus roles
 */
function hasRoutePermission(pathname: string, userRoles: string[]): boolean {
  for (const role of userRoles) {
    const allowedRoutes = ROLE_ROUTES[role];
    if (!allowedRoutes) continue;

    for (const route of allowedRoutes) {
      if (routeMatches(pathname, route)) {
        return true;
      }
    }
  }

  return false;
}

// Configuración de matcher para las rutas que deben pasar por el middleware
export const config = {
  matcher: [
    // Rutas básicas
    '/',
    '/_next/:path*',
    '/static/:path*',

    // Rutas de autenticación
    '/auth/:path*',

    // Rutas comunes
    '/my-file/:path*',
    '/profile',
    '/security',
    '/helps/:path*',
    '/helps/faqs-management/:path*',

    // Rutas de solicitudes
    '/request/:path*',
    '/request-management/:path*',

    // Rutas de RH
    '/document-management/:path*',
    '/time-tracking/:path*',
    '/system-configuration/:path*',
    '/system-configuration/departments/:path*',
    '/system-configuration/general-settings/:path*',
    '/system-configuration/positions/:path*',
    '/system-configuration/studies/:path*',
    '/hr-analytics/:path*',
    '/access-control/:path*',
    '/payroll-creation/:path*',
    '/roles-management/:path*',
    '/employees-management/:path*',
  ],
};