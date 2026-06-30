import type { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Tous les logements – Kasa",
  description: "Parcourez notre sélection d'appartements et de maisons à louer entre particuliers partout en France.",
}
import PropertyGrid from "@/components/property/PropertyGrid"
import Spinner from "@/components/ui/Spinner"
import { getProperties } from "@/actions/properties"

async function PropertyGridStream() {
  const properties = await getProperties()
  return <PropertyGrid properties={properties} />
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
    </main>
  )
}
