import type { Property } from "@/types/property"
import PropertyCard from "./PropertyCard"

type Props = {
  properties: Property[]
}

export default function PropertyGrid({ properties }: Props) {
  return (
    <div className="border border-dashed border-grey-dark p-4">
      <span className="text-sm text-grey-dark">Je suis la PropertyGrid ({properties.length} annonces)</span>
      <div className="mt-2 flex flex-col gap-2">
        {properties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  )
}