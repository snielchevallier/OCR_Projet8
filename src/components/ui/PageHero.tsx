import Image from "next/image"
import type { ReactNode } from "react"

type Props = {
  title: string
  imageSrc: string
  /** Texte alternatif de l'image — descriptif si informative, `""` si décorative */
  imageAlt: string
  children?: ReactNode
}

export default function PageHero({ title, imageSrc, imageAlt, children }: Props) {
  return (
    <section className="px-4 md:px-8 pt-8 pb-10">
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-[26px] font-bold text-main-red leading-tight">
          {title}
        </h1>
        {children && (
          <div className="mt-3 text-sm text-black max-w-70 mx-auto md:text-base md:max-w-full">
            {children}
          </div>
        )}
      </div>
      <div className="relative w-full aspect-4/3 md:aspect-16/6 overflow-hidden rounded-[20px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  )
}
