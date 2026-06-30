'use server'

import { redirect } from 'next/navigation'
import { loginWithCredentials, registerWithCredentials, setTokenCookie, deleteTokenCookie } from '@/lib/auth'
import { ApiError } from '@/lib/api'

export type LoginState = { error: string } | null

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * @param formData - Champs attendus : `email`, `password`, `callbackUrl` (optionnel)
 * @returns `LoginState` en cas d'erreur de validation ou d'API. Redirige via `redirect()` en cas de succès — ne retourne jamais null.
 */
export async function loginUser(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = (formData.get('email') as string)?.trim()
  const password = formData.get('password') as string
  const callbackUrl = (formData.get('callbackUrl') as string) || '/'

  if (!email || !EMAIL_REGEX.test(email)) return { error: 'Adresse email invalide' }
  if (!password) return { error: 'Mot de passe requis' }

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

/**
 * @param formData - Champs attendus : `firstname`, `lastname`, `email`, `password`, `terms` (checkbox `"on"`)
 * @returns `RegisterState` en cas d'erreur de validation ou d'API. Redirige vers `/` en cas de succès — ne retourne jamais null.
 */
export async function registerUser(_prevState: RegisterState, formData: FormData): Promise<RegisterState> {
  const firstname = (formData.get('firstname') as string)?.trim()
  const lastname = (formData.get('lastname') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const password = formData.get('password') as string
  const terms = formData.get('terms')
  const name = `${firstname} ${lastname}`.trim()

  if (!firstname) return { error: 'Prénom requis' }
  if (!lastname) return { error: 'Nom requis' }
  if (!email || !EMAIL_REGEX.test(email)) return { error: 'Adresse email invalide' }
  if (!password || password.length < 8) return { error: 'Le mot de passe doit contenir au moins 8 caractères' }
  if (terms !== 'on') return { error: "Vous devez accepter les conditions générales d'utilisation" }

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
