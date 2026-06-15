import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-grey-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" aria-label="Kasa — retour à l'accueil">
          <Image
            src="/img/picto-logo.svg"
            alt=""
            width={46}
            height={53}
            aria-hidden="true"
          />
        </Link>
        <p className="text-black text-sm">
          © 2025 Kasa. All rights reserved.
        </p>
      </div>
    </footer>
  )
}