import { Suspense } from "react"
import HeroSection from "@/components/home/HeroSection"
import HowItWorks from "@/components/home/HowItWorks"
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
