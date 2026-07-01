import type { Metadata } from "next"
import Image from "next/image"
import PageHero from "@/components/ui/PageHero"

export const metadata: Metadata = {
  title: "À propos – Kasa",
  description: "Découvrez la mission de Kasa : mettre en relation des voyageurs avec des hôtes passionnés qui partagent leur région.",
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001"

export default function AboutPage() {
  return (
    <main>
      <PageHero
        title="À propos"
        imageSrc="/img/about-1.jpg"
        imageAlt="Maison contemporaine en bois entourée de verdure"
      >
        <p>Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se sentir bien.</p>
        <p className="mt-2">
          Depuis notre création, nous mettons en relation des voyageurs en quête d'authenticité
          avec des hôtes passionnés qui aiment partager leur région et leurs bonnes adresses.
        </p>
      </PageHero>

      <section aria-labelledby="mission-title" className="px-4 md:px-8 pb-10 md:grid md:grid-cols-2 md:gap-12 md:items-start">
        <div>
          <h2 id="mission-title" className="text-lg font-bold text-main-red mb-4">
            Notre mission est simple&nbsp;:
          </h2>
          <ol className="space-y-3 text-sm md:text-base text-black list-decimal pl-5">
            <li>Offrir une plateforme fiable et simple d'utilisation</li>
            <li>Proposer des hébergements variés et de qualité</li>
            <li>Favoriser des échanges humains et chaleureux entre hôtes et voyageurs</li>
          </ol>
          {/* Quote — desktop uniquement, dans la colonne gauche */}
          <p className="hidden md:block mt-8 text-main-red text-lg leading-relaxed">
            Que vous cherchiez un appartement cosy en centre-ville, une maison en bord de mer
            ou un chalet à la montagne, Kasa vous accompagne pour que chaque séjour devienne
            un souvenir inoubliable.
          </p>
        </div>

        <div className="relative w-full mt-6 md:mt-0 aspect-4/3 overflow-hidden rounded-[20px]">
          <Image
            src="/img/about-2.jpg"
            alt="Chalet à ossature triangulaire au coucher du soleil"
            fill
            className="object-cover"
          />
        </div>

        {/* Quote — mobile uniquement, après l'image */}
        <p className="md:hidden mt-6 text-main-red text-lg leading-relaxed">
          Que vous cherchiez un appartement cosy en centre-ville, une maison en bord de mer
          ou un chalet à la montagne, Kasa vous accompagne pour que chaque séjour devienne
          un souvenir inoubliable.
        </p>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "À propos – Kasa",
            "url": `${BASE_URL}/about`,
            "mainEntity": {
              "@type": "Organization",
              "name": "Kasa",
              "url": BASE_URL,
              "description": "Mise en relation de voyageurs avec des hôtes passionnés qui partagent leur région.",
            },
          }),
        }}
      />
    </main>
  )
}