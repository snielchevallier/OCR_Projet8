import type { Metadata } from "next"
import { Suspense } from "react"
import HeroSection from "@/components/home/HeroSection"
import HowItWorks from "@/components/home/HowItWorks"
import PropertyGrid from "@/components/property/PropertyGrid"
import Spinner from "@/components/ui/Spinner"
import { getProperties } from "@/actions/properties"

export const metadata: Metadata = {
  title: "Kasa – Location entre particuliers",
  description: "Trouvez votre logement idéal parmi nos appartements et maisons à louer entre particuliers partout en France.",
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001"

async function PropertyGridStream() {
  const properties = await getProperties()
  return <PropertyGrid properties={properties} />
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <Suspense fallback={
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      }>
        <PropertyGridStream />
      </Suspense>
      <HowItWorks />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Kasa",
            "url": BASE_URL,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Kasa",
            "url": BASE_URL,
            "description": "location d'appartements et de maisons entre particuliers",
          }),
        }}
      />
    </main>
  )
}
