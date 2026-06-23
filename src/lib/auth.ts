import { cookies } from 'next/headers'
import { apiFetch } from './api'
import type { User } from '@/types/user'

export async function loginWithCredentials(email: string, password: string) {
  return apiFetch<{ token: string; user: User }>('/auth/login', {
    method: 'POST',
    body: { email, password },
  })
}

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
    const b64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(Buffer.from(b64, 'base64').toString('utf-8'))
  } catch {
    return null
  }
}
