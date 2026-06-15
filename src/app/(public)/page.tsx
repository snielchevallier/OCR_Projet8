import HeroSection from "@/components/home/HeroSection"
import HowItWorks from "@/components/home/HowItWorks"
import PropertyGrid from "@/components/property/PropertyGrid"
import { getProperties } from "@/actions/properties"

export default async function HomePage() {
  const properties = await getProperties()

  return (
    <main>
      <HeroSection />
      <PropertyGrid properties={properties} />
      <HowItWorks />
    </main>
  )
}
