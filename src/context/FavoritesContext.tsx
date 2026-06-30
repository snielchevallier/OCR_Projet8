"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

const STORAGE_KEY = "kasa_favorites"

type FavoritesContextValue = {
  favoriteIds: string[]
  isFavorite: (id: string) => boolean
  toggle: (id: string) => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setFavoriteIds(JSON.parse(raw))
    } catch {}
    // localStorage inaccessible en navigation privée ou si le JSON est corrompu — on ignore et repart de zéro
  }, [])

  const isFavorite = useCallback(
    (id: string) => favoriteIds.includes(id),
    [favoriteIds]
  )

  const toggle = useCallback((id: string) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((fid) => fid !== id)
        : [...prev, id]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {}
      // localStorage inaccessible (navigation privée) ou quota dépassé — l'état reste en mémoire
      return next
    })
  }, [])

  return (
    <FavoritesContext.Provider value={{ favoriteIds, isFavorite, toggle }}>
      {children}
    </FavoritesContext.Provider>
  )
}

/** @throws {Error} Si appelé en dehors d'un `FavoritesProvider` */
export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error("useFavorites doit être utilisé dans un FavoritesProvider")
  return ctx
}
