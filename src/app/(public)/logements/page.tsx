import type { Metadata } from "next"
import { Suspense } from "react"
import PropertyGrid from "@/components/property/PropertyGrid"
import Spinner from "@/components/ui/Spinner"
import { getProperties } from "@/actions/properties"

export const metadata: Metadata = {
  title: "Tous les logements – Kasa",
  description: "Parcourez notre sélection d'appartements et de maisons à louer entre particuliers partout en France.",
}

async function PropertyGridStream() {
  const properties = await getProperties()
  return <PropertyGrid properties={properties} />
}

async function PropertyListJsonLd() {
  const properties = await getProperties()
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001"
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Tous les logements – Kasa",
          "numberOfItems": properties.length,
          "itemListElement": properties.map((p, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "url": `${BASE_URL}/logements/${p.id}--${p.slug}`,
          })),
        }),
      }}
    />
  )
}

export default function Logements() {
  return (
    <main>
      <Suspense fallback={
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      }>
        <PropertyGridStream />
      </Suspense>
      <PropertyListJsonLd />
    </main>
  )
}
