import type { Property } from "@/types/property"
import PropertyCard from "./PropertyCard"

type Props = {
  properties: Property[]
}

export default function PropertyGrid({ properties }: Props) {
  return (
    <section aria-label="Liste des logements" className="px-4 md:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </section>
  )
}
