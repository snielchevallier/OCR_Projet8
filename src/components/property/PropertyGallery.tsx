"use client"

import { useState } from "react"
import Image from "next/image"
import Carousel from "@/components/ui/Carousel"
import { BLUR_PLACEHOLDER } from "@/lib/image"

type Props = {
  pictures: string[]
  cover: string
  title: string
}

export default function PropertyGallery({ pictures, cover, title }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // La cover est incluse dans pictures par l'API — on l'exclut pour éviter la duplication dans la mosaïque
  const smallImages = pictures.filter((p) => p !== cover).slice(0, 4)

  const indexInPictures = (img: string) => {
    const i = pictures.indexOf(img)
    return i >= 0 ? i : 0
  }

  return (
    <>
      {/* Desktop — mosaïque 3 colonnes */}
      <div className="hidden lg:grid lg:h-100 lg:grid-cols-[2fr_1fr_1fr] lg:grid-rows-2 lg:gap-2 lg:overflow-hidden ">
        <button
          type="button"
          onClick={() => setOpenIndex(indexInPictures(cover))}
          className="relative row-span-2 overflow-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-main-red"
          aria-label={`Voir toutes les photos de ${title}`}
        >
          <Image
            src={cover}
            alt={`Photo principale de ${title}`}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105 lg:rounded-2xl"
            sizes="(min-width: 1024px) 50vw, 100vw"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            priority
          />
        </button>

        {Array.from({ length: 4 }).map((_, i) => {
          const img = smallImages[i]
          return img ? (
            <button
              key={img}
              type="button"
              onClick={() => setOpenIndex(indexInPictures(img))}
              className="relative overflow-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-main-red lg:rounded-2xl"
              aria-label={`Voir la photo ${i + 2} de ${title}`}
            >
              <Image
                src={img}
                alt={`Photo ${i + 2} de ${title}`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(min-width: 1024px) 25vw, 50vw"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
              />
            </button>
          ) : (
            <div key={i} className="bg-grey-light" aria-hidden="true" />
          )
        })}
      </div>

      {/* Mobile — cover large + rangée de thumbnails */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpenIndex(indexInPictures(cover))}
          className="relative block h-70 w-full overflow-hidden rounded-xl focus-visible:ring-2 focus-visible:ring-main-red focus-visible:ring-offset-2"
          aria-label={`Voir toutes les photos de ${title}`}
        >
          <Image
            src={cover}
            alt={`Photo principale de ${title}`}
            fill
            className="object-cover"
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            priority
          />
        </button>

        {smallImages.length > 0 && (
          <div className="mt-2 grid h-20 grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => {
              const img = smallImages[i]
              return img ? (
                <button
                  key={img}
                  type="button"
                  onClick={() => setOpenIndex(indexInPictures(img))}
                  className="relative overflow-hidden rounded-lg focus-visible:ring-2 focus-visible:ring-main-red focus-visible:ring-offset-1"
                  aria-label={`Voir la photo ${i + 2} de ${title}`}
                >
                  <Image
                    src={img}
                    alt={`Photo ${i + 2} de ${title}`}
                    fill
                    className="object-cover"
                    sizes="25vw"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                  />
                </button>
              ) : (
                <div key={i} className="rounded-lg bg-grey-light" aria-hidden="true" />
              )
            })}
          </div>
        )}
      </div>

      {/* Carrousel plein écran */}
      {openIndex !== null && (
        <Carousel
          images={pictures}
          initialIndex={openIndex}
          title={title}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  )
}
