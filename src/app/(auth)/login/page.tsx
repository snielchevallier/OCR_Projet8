import Link from 'next/link'
import LoginForm from "@/components/forms/LoginForm"

export default function LoginPage() {
  return (
    <main>
      <section className="px-4 md:px-8 pt-8 pb-10 max-w-[600px] mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-[26px] font-bold text-main-red leading-tight">
            Heureux de vous revoir
          </h1>
          <p className="mt-3 text-sm text-black max-w-70 mx-auto md:text-base md:max-w-full">
            Connectez-vous pour retrouver vos réservations, vos annonces et tout ce qui rend vos séjours uniques.
          </p>
        </div>
        <LoginForm />

      </section>
      <div className="text-center mb-6 md:mb-8">
        <p className="mt-3 text-sm text-main-red max-w-70 mx-auto md:text-base md:max-w-full">
          <Link href="/forgot-password" className="text-main-red hover:underline">
            Mot de passe oublié
          </Link>
        </p>
        <p className="mt-3 text-sm text-main-red max-w-70 mx-auto md:text-base md:max-w-full">
          Pas encore de compte ? <Link href="/signin" className="text-main-red hover:underline">
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </main>
  )
}
