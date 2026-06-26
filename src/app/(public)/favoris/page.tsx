"use client"

import { useEffect, useState } from "react"
import { useFavorites } from "@/context/FavoritesContext"
import { getProperties } from "@/actions/properties"
import PropertyGrid from "@/components/property/PropertyGrid"
import Spinner from "@/components/ui/Spinner"
import type { Property } from "@/types/property"

export default function FavorisPage() {
  const { favoriteIds } = useFavorites()
  const [favorites, setFavorites] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (favoriteIds.length === 0) {
      setFavorites([])
      setLoading(false)
      return
    }
    getProperties()
      .then((all) => setFavorites(all.filter((p) => favoriteIds.includes(p.id))))
      .finally(() => setLoading(false))
  }, [favoriteIds])

  return (
    <main>
      <section className="px-4 md:px-8 pt-8 pb-10">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-[26px] font-bold text-main-red leading-tight">
            Favoris
          </h1>
          <p className="mt-3 text-sm text-black max-w-70 mx-auto md:text-base md:max-w-full">
            Retrouvez ici tous les logements que vous avez aimés.<br />
            Prêts à réserver ? Un simple clic et votre prochain séjour est en route.
          </p>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : favorites.length === 0 ? (
        <p className="px-4 md:px-8 text-grey-dark">Vous n'avez pas encore de logements favoris.</p>
      ) : (
        <PropertyGrid properties={favorites} />
      )}
    </main>
  )
}
