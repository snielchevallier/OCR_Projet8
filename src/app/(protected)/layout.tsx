import type { ReactNode } from "react"
// TODO: lire le cookie JWT (cookies() de next/headers), vérifier avec jose, redirect('/login') si invalide

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
