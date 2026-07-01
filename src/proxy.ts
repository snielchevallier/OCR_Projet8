import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_ROUTES = ['/messagerie', '/logements/ajouter']
const AUTH_ROUTES = ['/login', '/signin']

/**
 * Middleware de routage auth :
 * - Routes auth (`/login`, `/signin`) → redirige vers `/` si déjà connecté
 * - Routes protégées (`/messagerie`, `/logements/ajouter`) → redirige vers `/login?callbackUrl=<pathname>` si non connecté
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value

  if (AUTH_ROUTES.includes(pathname)) {
    if (token) return NextResponse.redirect(new URL('/', request.url))
    return NextResponse.next()
  }

  if (PROTECTED_ROUTES.includes(pathname) && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/messagerie', '/logements/ajouter', '/login', '/signin'],
}