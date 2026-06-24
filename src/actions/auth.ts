'use server'

import { redirect } from 'next/navigation'
import { loginWithCredentials, registerWithCredentials, setTokenCookie, deleteTokenCookie } from '@/lib/auth'
import { ApiError } from '@/lib/api'

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

export type RegisterState = { error: string } | null

export async function registerUser(_prevState: RegisterState, formData: FormData): Promise<RegisterState> {
  const firstname = formData.get('firstname') as string
  const lastname = formData.get('lastname') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = `${firstname} ${lastname}`.trim()

  try {
    const { token } = await registerWithCredentials(name, email, password)
    await setTokenCookie(token)
  } catch (err) {
    if (err instanceof ApiError && err.status === 409) {
      return { error: 'Cette adresse email est déjà utilisée' }
    }
    return { error: 'Une erreur est survenue, veuillez réessayer' }
  }
  redirect('/')
}

/** Supprime le cookie `token` et redirige vers l'accueil. */
export async function logoutUser(): Promise<void> {
  await deleteTokenCookie()
  redirect('/')
}
