"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { User } from "@/types/user"

type AuthContextValue = {
  user: User | null
  isLoggedIn: boolean
  login: (token: string, user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  /** `token` est destiné au cookie (httpOnly via Server Action), `user` au state React. */
  function login(token: string, user: User) {
    // TODO: stocker le token dans un cookie + mettre à jour le state
    setUser(user)
    console.debug("[AuthContext] login — TODO: implémenter", { token, user })
  }

  function logout() {
    // TODO: supprimer le cookie + reset state
    setUser(null)
    console.debug("[AuthContext] logout — TODO: implémenter")
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: user !== null, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

/** @throws {Error} Si appelé en dehors d'un `AuthProvider` */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth doit être utilisé dans un AuthProvider")
  return ctx
}