import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = [
  '/auth/login',
  '/api/setCookie',
  '/_next/static',
  '/_next/css',
  '/_next/image',
  '/imgs',
  '/terminos-condiciones',
];

export async function middleware(req: NextRequest) {

  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const cookie = cookies()
  const token = cookie.get('auth_token');
  const rol = cookie.get('user_role');

  if (!cookie) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    if (rol?.value === 'vendedor' && !pathname.startsWith('/localidades')) {
      return NextResponse.redirect(new URL(`/localidades`, req.url))
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}