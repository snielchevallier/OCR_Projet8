import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { ReactNode } from "react"

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")

  // TODO: vérifier la validité du JWT avec jose (pas seulement son existence)
  if (token) redirect("/")

  return <>{children}</>
}