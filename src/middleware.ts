import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { Payload } from './types/auth/authResponseTypes';
import { Roles } from './lib/constants';

async function authMiddleware(req: NextRequest) {
  try {
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (session) {
      return null;
    }

    return NextResponse.redirect(new URL('/auth/login', req.url));
  } catch (error) {
    console.error('Error al obtener el token:', error);
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
}

async function rolesMiddleware(req: NextRequest, roles: string[]) {
  try {
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const tokenDecoded: Payload | null = jwtDecode(session?.access_token as string);

    if (roles.some((role) => tokenDecoded?.roles.includes(role))) {
      return null;
    }
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  } catch (error) {
    console.error('Error al verificar roles:', error);
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow access to static files
  if (pathname.startsWith('/_next') || pathname.startsWith('/static')) {
    return NextResponse.next();
  }

  // Allow access to public auth routes
  if (pathname.startsWith('/auth')) {
    if (pathname === '/auth/register') {
      return await rolesMiddleware(req, [Roles.rh]);
    }
    return NextResponse.next();
  }

  // Limitar acceso a /request-management a los roles ADMIN y RH
  if (pathname.startsWith('/request-management')) {
    const roleResponse = await rolesMiddleware(req, [Roles.admin, Roles.rh]);
    if (roleResponse) return roleResponse;
  }

  // Protect all private routes
  let response = await authMiddleware(req);
  if (response) {
    return response;
  }

  return NextResponse.next();
}

// Define matcher for all private routes incluyendo sub-rutas
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
    '/system-configuration/:path*',
    '/document-management/:path*',
    '/payroll-creation/:path*',
    '/request/:path*',
    '/request-management/:path*',
    '/time-tracking/:path*',
  ],
};
