"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

function FavIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M3.2002 6.28595C3.2002 9.97795 8.0002 12.4579 8.0002 12.4579C8.0002 12.4579 12.8002 9.97995 12.8002 6.28595C12.8002 4.77195 11.5722 3.54395 10.0582 3.54395C9.2342 3.54395 8.5042 3.91395 8.0002 4.48995C7.4982 3.91395 6.7662 3.54395 5.9422 3.54395C4.4282 3.54195 3.2002 4.76995 3.2002 6.28595Z"
        fill="none"
        stroke="#99331A"
        strokeWidth="0.8"
      />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M12.2461 3.72095C12.7445 3.72111 13.1502 4.12685 13.1504 4.62524V9.93286C13.1502 10.4313 12.7445 10.837 12.2461 10.8372H6.8584L5.44727 12.1125C5.32745 12.2209 5.17586 12.2785 5.02051 12.2786C4.93188 12.2786 4.84272 12.2601 4.75879 12.2229C4.52544 12.1189 4.37876 11.8938 4.37891 11.6379V10.8372H3.75488C3.25617 10.8372 2.84975 10.4314 2.84961 9.93286V4.62524C2.84977 4.12672 3.25619 3.72095 3.75488 3.72095H12.2461Z"
        fill="none"
        stroke="#99331A"
        strokeWidth="0.8"
      />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="29" height="21" viewBox="0 0 29 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.16888 1.43378C7.16888 0.641951 7.81084 0 8.60266 0H27.2418C28.0336 0 28.6755 0.641951 28.6755 1.43378C28.6755 2.2256 28.0336 2.86755 27.2418 2.86755H8.60266C7.81084 2.86755 7.16888 2.22555 7.16888 1.43378ZM27.2418 8.60266H1.43378C0.641951 8.60266 0 9.24467 0 10.0364C0 10.8283 0.641951 11.4702 1.43378 11.4702H27.2418C28.0336 11.4702 28.6755 10.8283 28.6755 10.0364C28.6755 9.24467 28.0336 8.60266 27.2418 8.60266ZM27.2418 17.2053H14.3378C13.546 17.2053 12.904 17.8473 12.904 18.6391C12.904 19.4309 13.546 20.0729 14.3378 20.0729H27.2418C28.0336 20.0729 28.6755 19.4309 28.6755 18.6391C28.6755 17.8473 28.0336 17.2053 27.2418 17.2053Z" fill="#565656"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.514359 0.511485C1.19634 -0.170495 2.30211 -0.170495 2.98409 0.511485L12.9177 10.4441L22.8513 0.515391C23.5333 -0.166589 24.639 -0.166589 25.321 0.515391C26.0027 1.19739 26.0029 2.30322 25.321 2.98512L15.3874 12.9138L25.32 22.8464C26.002 23.5284 26.0019 24.6342 25.32 25.3162C24.9771 25.6591 24.5295 25.8288 24.0856 25.8289C23.6377 25.8289 23.1933 25.6592 22.8503 25.3162L12.9177 15.3836L2.98116 25.3162C2.64218 25.6592 2.19373 25.8289 1.7458 25.8289C1.29797 25.8288 0.854366 25.6591 0.511429 25.3162C-0.170439 24.6342 -0.170514 23.5284 0.511429 22.8464L10.448 12.9138L0.514359 2.98024C-0.167046 2.29836 -0.167063 1.19335 0.514359 0.511485Z" fill="#0D0D0D"/>
    </svg>
  )
}

const mobileNavLinks = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/messagerie", label: "Messagerie" },
  { href: "/favoris", label: "Favoris" },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const closeMenu = () => setMenuOpen(false)

  // Fermer avec Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && menuOpen) closeMenu()
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [menuOpen])

  // Bloquer le scroll du body quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  // Focus : bouton fermer à l'ouverture, hamburger à la fermeture
  useEffect(() => {
    if (menuOpen) {
      closeButtonRef.current?.focus()
    } else {
      openButtonRef.current?.focus()
    }
  }, [menuOpen])

  // Focus trap dans le menu mobile
  useEffect(() => {
    if (!menuOpen || !menuRef.current) return
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    function onTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener("keydown", onTab)
    return () => document.removeEventListener("keydown", onTab)
  }, [menuOpen])

  return (
    <header className="w-full">

      {/* ── Desktop (md+) — cartouche flottant ── */}
      <div className="hidden md:block py-7.5">
        <div className="max-w-195.5 mx-auto bg-white rounded-[10px] shadow-[0_4px_4px_0_rgba(182,182,182,0.05)] px-25 py-2">
          <div className="grid grid-cols-[2fr_auto_3fr] items-center">

            {/* Gauche */}
            <nav aria-label="Navigation principale">
              <ul className="flex items-center gap-6 list-none">
                {[{ href: "/", label: "Accueil" }, { href: "/about", label: "À propos" }].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={pathname === href ? "page" : undefined}
                      className="text-sm text-black hover:text-main-red transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red aria-[current=page]:text-main-red aria-[current=page]:font-medium"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Centre — logo */}
            <div className="flex justify-center">
              <Link href="/" aria-label="Kasa — accueil">
                <Image src="/img/logo-header.svg" alt="Kasa" width={120} height={48} priority />
              </Link>
            </div>

            {/* Droite */}
            <nav aria-label="Actions" className="flex items-center justify-end gap-4">
              <Link
                href="/logements/ajouter"
                className="text-main-red text-sm font-medium whitespace-nowrap hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red"
              >
                +Ajouter un logement
              </Link>
              <Link
                href="/favoris"
                aria-label="Mes favoris"
                aria-current={pathname === "/favoris" ? "page" : undefined}
                className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red"
              >
                <FavIcon />
              </Link>
              <span aria-hidden="true" className="text-main-red select-none">|</span>
              <Link
                href="/messagerie"
                aria-label="Messagerie"
                aria-current={pathname === "/messagerie" ? "page" : undefined}
                className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red"
              >
                <ChatIcon />
              </Link>
            </nav>

          </div>
        </div>
      </div>

      {/* ── Mobile header bar (< md) ── */}
      <div className="flex md:hidden items-center justify-between px-4 h-14">
        <Link href="/" aria-label="Kasa — accueil">
          <Image src="/img/picto-logo.svg" alt="Kasa" width={36} height={41} priority />
        </Link>
        <button
          ref={openButtonRef}
          type="button"
          aria-label="Ouvrir le menu de navigation"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
          className="p-2 text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red"
        >
          <MenuIcon />
        </button>
      </div>

      {/* ── Menu mobile overlay ── */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          className="fixed inset-0 bg-white z-50 flex flex-col px-6 pt-6 pb-10"
        >
          {/* Barre logo + fermer */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" onClick={closeMenu} aria-label="Kasa — accueil">
              <Image src="/img/picto-logo.svg" alt="Kasa" width={36} height={41} />
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Fermer le menu"
              onClick={closeMenu}
              className="p-2 text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Liens */}
          <nav aria-label="Navigation principale">
            <ul className="flex flex-col list-none">
              {mobileNavLinks.map(({ href, label }) => (
                <li key={href} className="border-b border-grey-light">
                  <Link
                    href={href}
                    onClick={closeMenu}
                    aria-current={pathname === href ? "page" : undefined}
                    className="block py-4 text-lg text-black font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red aria-[current=page]:text-main-red"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bouton Ajouter */}
          <div className="mt-8">
            <Link
              href="/logements/ajouter"
              onClick={closeMenu}
              className="inline-block bg-dark-orange text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-main-red transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-orange"
            >
              Ajouter un logement
            </Link>
          </div>
        </div>
      )}

    </header>
  )
}
