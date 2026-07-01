import Link from 'next/link'
import SigninForm from "@/components/forms/SigninForm"

export default function SigninPage() {
  return (
    <main>
          <section className="px-4 md:px-8 pt-8 pb-10 max-w-[600px] mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <h1 className="text-2xl md:text-[26px] font-bold text-main-red leading-tight">
                Rejoignez la communauté Kasa
              </h1>
              <p className="mt-3 text-sm text-black max-w-70 mx-auto md:text-base md:max-w-full">
                Créez votre compte et commencez à voyager autrement : réservez des logements uniques, découvrez de nouvelles destinations et partagez vos propres lieux avec d’autres voyageurs.
              </p>
            </div>
            <SigninForm />
    
          </section>
          <div className="text-center mb-6 md:mb-8">
            <p className="mt-3 text-sm text-main-red max-w-70 mx-auto md:text-base md:max-w-full">
              Déjà membre ? <Link href="/login" className="text-main-red hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </main>
  )
}
