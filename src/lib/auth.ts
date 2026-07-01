import { cookies } from 'next/headers'
import { apiFetch } from './api'
import type { User } from '@/types/user'

/** @throws {ApiError} 409 si l'email est déjà utilisé */
export async function registerWithCredentials(name: string, email: string, password: string) {
  return apiFetch<{ token: string; user: User }>('/auth/register', {
    method: 'POST',
    body: { name, email, password },
  })
}

/** @throws {ApiError} 401 si les identifiants sont incorrects */
export async function loginWithCredentials(email: string, password: string) {
  return apiFetch<{ token: string; user: User }>('/auth/login', {
    method: 'POST',
    body: { email, password },
  })
}

/**
 * Pose le cookie `token` httpOnly, sameSite=lax, 7 jours.
 * `secure` est activé uniquement en production.
 */
export async function setTokenCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function deleteTokenCookie() {
  const cookieStore = await cookies()
  cookieStore.delete('token')
}

/** Décode le payload JWT en base64 — pour l'init UI uniquement, non cryptographique. */
export async function decodeTokenPayload() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) return null
  try {
    // JWT utilise le base64 URL-safe (RFC 4648 §5) : -_ → +/ pour le décodage standard
    const b64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(Buffer.from(b64, 'base64').toString('utf-8'))
  } catch {
    return null
  }
}
