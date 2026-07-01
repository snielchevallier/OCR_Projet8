"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { Property } from "@/types/property"
import { BLUR_PLACEHOLDER } from "@/lib/image"
import { useFavorites } from "@/context/FavoritesContext"
import FavoriteButton from "@/components/property/FavoriteButton"

type Props = {
  property: Property
}

export default function PropertyCard({ property }: Props) {
  const { isFavorite, toggle } = useFavorites()
  const favorited = isFavorite(property.id)
  const pathname = usePathname()

  const href = `/logements/${property.id}--${property.slug}?from=${encodeURIComponent(pathname)}`

  return (
    <article className="relative h-138 rounded-2xl overflow-hidden bg-white">
      <FavoriteButton
        propertyId={property.id}
        isFavorite={favorited}
        onToggle={() => toggle(property.id)}
      />

      <Link
        href={href}
        className="flex flex-col h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red"
      >
        <div className="relative h-82.5 shrink-0">
          <Image
            src={property.cover}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 355px"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
        </div>

        <div className="flex flex-col flex-1 p-4">
          <h2 className="font-bold text-base text-black leading-snug">{property.title}</h2>
          <p className="mt-1 text-sm text-grey-dark">{property.location}</p>
          <div className="flex-1" />
          <p className="text-sm text-black">
            <span className="font-bold">{property.price_per_night}€</span>
            <span className="font-normal"> par nuit</span>
          </p>
        </div>
      </Link>
    </article>
  )
}