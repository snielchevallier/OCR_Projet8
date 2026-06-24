'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { registerUser } from '@/actions/auth'

export default function SigninForm() {
  const [state, action, isPending] = useActionState(registerUser, null)

  return (
    <form action={action} className="w-90 mx-auto mt-4 gap-4 flex flex-col">
      <div className="mb-2">
        <label htmlFor="lastname" className="block text-sm font-normal text-black">
          Nom
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          required
          className="mt-1 p-2 block w-full
                border border-grey-light rounded-sm
                text-sm font-normal
                focus:outline-none focus-visible:ring-2 focus-visible:ring-main-red focus-visible:ring-offset-2"
          placeholder="Votre nom"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="firstname" className="block text-sm font-normal text-black">
          Prénom
        </label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          required
          className="mt-1 p-2 block w-full
                border border-grey-light rounded-sm
                text-sm font-normal
                focus:outline-none focus-visible:ring-2 focus-visible:ring-main-red focus-visible:ring-offset-2"
          placeholder="Votre prénom"
        />
      </div>

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

      <div className="mb-2">
        <input type="checkbox" id="terms" name="terms" required className="mr-2" />
        <label htmlFor="terms" className="text-sm text-black">
          J&apos;accepte les{' '}
          <Link href="/cgu" target="_blank" className="text-main-red hover:underline">
            conditions générales d&apos;utilisation
          </Link>
        </label>
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
        {isPending ? 'Inscription…' : "S'inscrire"}
      </button>
    </form>
  )
}
