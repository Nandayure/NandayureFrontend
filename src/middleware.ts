import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { Payload } from './types/auth/authResponseTypes';
import {
  ROLE_ROUTES,
  isPublicRoute,
  routeMatches,
} from './config/middleware.config';
import { Roles } from './constants/roles/roles';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Permitir archivos estáticos
  if (pathname.startsWith('/_next') || pathname.startsWith('/static')) {
    return NextResponse.next();
  }

  // Permitir rutas públicas
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Obtiene la sesión (token)
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Decodifica el token para obtener roles
  const tokenDecoded: Payload | null = jwtDecode(
    session.access_token as string,
  );
  if (!tokenDecoded || !tokenDecoded.roles) {
    console.error('Token inválido o sin roles');
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Los administradores tienen acceso total
  if (tokenDecoded.roles.includes(Roles.admin)) {
    return NextResponse.next();
  }

  // Valida acceso según lo definido en ROLE_ROUTES
  let hasPermission = false;
  for (const role of tokenDecoded.roles) {
    const allowedRoutes = ROLE_ROUTES[role];
    if (allowedRoutes) {
      for (const route of allowedRoutes) {
        if (routeMatches(pathname, route)) {
          hasPermission = true;
          break;
        }
      }
      if (hasPermission) break;
    }
  }

  if (!hasPermission) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
}

// Define matcher para las rutas privadas y otras que requieren pasar por el middleware
export const config = {
  matcher: [
    '/',
    '/auth/:path*',
    '/_next/:path*',
    '/static/:path*',
    '/admin/:path*',
    '/profile/:path*',
    '/security/:path*',
    '/dashboard/:path*',
    '/my-file/:path*',
    '/system-configuration/:path*',
    '/document-management/:path*',
    '/payroll-creation/:path*',
    '/request/:path*',
    '/request-management/:path*',
    '/time-tracking/:path*',
  ],
};
