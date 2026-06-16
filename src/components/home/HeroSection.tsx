import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="px-4 md:px-8 pt-8 pb-10">
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-[26px] font-bold text-main-red leading-tight">
          Chez vous, partout et ailleurs
        </h1>
        <p className="mt-3 text-sm text-black max-w-70 mx-auto md:text-base md:max-w-full">
          Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux,
          sélectionnés avec soin par nos hôtes.
        </p>
      </div>
      <div className="relative w-full aspect-4/3 md:aspect-16/6 overflow-hidden rounded-[20px]">
        <Image
          src="/img/hero-image.jpg"
          alt="Une maison contemporaine en bois au milieu des dunes"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  )
}