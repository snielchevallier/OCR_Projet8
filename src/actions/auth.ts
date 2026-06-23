'use server'

import { redirect } from 'next/navigation'
import { loginWithCredentials, setTokenCookie } from '@/lib/auth'
import { ApiError } from '@/lib/api'
import type { User } from '@/types/user'

export type LoginState = { error: string } | null

export async function loginUser(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const callbackUrl = (formData.get('callbackUrl') as string) || '/'

  try {
    const { token } = await loginWithCredentials(email, password)
    await setTokenCookie(token)
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      return { error: 'Email ou mot de passe incorrect' }
    }
    return { error: 'Une erreur est survenue, veuillez réessayer' }
  }
  redirect(callbackUrl)
}

// TODO: implémenter registerUser
/** @throws {ApiError} 409 si l'email est déjà utilisé */
export async function registerUser(_name: string, _email: string, _password: string): Promise<{ token: string; user: User }> {
  throw new Error('registerUser — non implémenté')
}

// TODO: implémenter logoutUser
/** Supprime le cookie `token` côté serveur. */
export async function logoutUser(): Promise<void> {
  throw new Error('logoutUser — non implémenté')
}
