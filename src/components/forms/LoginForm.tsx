'use client'

import { useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import { loginUser } from '@/actions/auth'

export default function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/'
  const [state, action, isPending] = useActionState(loginUser, null)

  return (
    <form action={action} className="w-90 mx-auto mt-4 gap-4 flex flex-col">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <div className="mb-2">
        <label htmlFor="email" className="block text-sm font-normal text-black">
          Adresse email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 p-2 block w-full
                border border-grey-light rounded-sm
                text-sm font-normal
                focus:outline-none focus-visible:ring-2 focus-visible:ring-main-red focus-visible:ring-offset-2"
          placeholder="Votre adresse email"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="password" className="block text-sm font-normal text-black">
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="mt-1 p-2 block w-full
                border border-grey-light rounded-sm
                text-sm font-normal
                focus:outline-none focus-visible:ring-2 focus-visible:ring-main-red focus-visible:ring-offset-2"
          placeholder="Votre mot de passe"
        />
      </div>

      {state?.error && (
        <p role="alert" className="text-sm text-main-red">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="
              w-full py-2 px-4
              bg-main-red text-white text-base font-medium
              rounded-xl
              hover:bg-orange/90
              focus:outline-none focus-visible:ring-2 focus-visible:ring-main-red focus-visible:ring-offset-2
              disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? 'Connexion…' : 'Se connecter'}
      </button>
    </form>
  )
}
