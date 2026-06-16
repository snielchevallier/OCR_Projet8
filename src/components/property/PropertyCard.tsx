"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Property } from "@/types/property"

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M3.2002 6.28595C3.2002 9.97795 8.0002 12.4579 8.0002 12.4579C8.0002 12.4579 12.8002 9.97995 12.8002 6.28595C12.8002 4.77195 11.5722 3.54395 10.0582 3.54395C9.2342 3.54395 8.5042 3.91395 8.0002 4.48995C7.4982 3.91395 6.7662 3.54395 5.9422 3.54395C4.4282 3.54195 3.2002 4.76995 3.2002 6.28595Z"
        fill={filled ? "#99331A" : "none"}
        stroke="#99331A"
        strokeWidth="0.8"
      />
    </svg>
  )
}

type Props = {
  property: Property
}

export default function PropertyCard({ property }: Props) {
  const [favorited, setFavorited] = useState(false)

  return (
    <article className="relative h-138 rounded-2xl overflow-hidden bg-white">
      <button
        type="button"
        aria-label={favorited ? "Retirer des favoris" : "Ajouter aux favoris"}
        aria-pressed={favorited}
        onClick={() => setFavorited((f) => !f)}
        className="absolute top-3 right-3 z-10 w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red cursor-pointer"
      >
        <HeartIcon filled={favorited} />
      </button>

      <Link
        href={`/logements/${property.id}--${property.slug}`}
        className="flex flex-col h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red"
      >
        <div className="relative h-82.5 shrink-0">
          <Image
            src={property.cover}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 355px"
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