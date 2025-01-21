
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = [
  '/auth/login',
  '/api/setCookie',
  '/_next/static',
  '/_next/css',
  '/_next/image',
  '/imgs',
  '/assets',
  '/terminos-condiciones',
  '/login'
];

export async function middleware(req: NextRequest) {

  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  let cookie = req.cookies.get('auth_data');
  const cookieData = cookie ? JSON.parse(cookie.value) : null;

  if (!cookie) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    const rol = cookieData.rol
    if (rol === 'vendedor' && !pathname.startsWith('/localidades')) {
      return NextResponse.redirect(new URL(`/localidades`, req.url))
    }
    if (rol === 'admin' && !pathname.startsWith('/panel')) {
      return NextResponse.redirect(new URL(`/panel`, req.url))
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}