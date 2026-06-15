import type { Property } from "@/types/property"

type Props = {
  property: Property
}

export default function PropertyCard({ property }: Props) {
  return (
    <div className="border border-dashed border-grey-dark p-4">
      <span className="text-sm text-grey-dark">Je suis une PropertyCard — {property.title}</span>
    </div>
  )
}