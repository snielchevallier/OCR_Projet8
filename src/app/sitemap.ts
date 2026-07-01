import { MetadataRoute } from 'next'
import { getProperties } from '@/actions/properties'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/logements`, lastModified: new Date(), priority: 0.9 },
  ]

  let propertyRoutes: MetadataRoute.Sitemap = []
  try {
    const properties = await getProperties()
    propertyRoutes = properties.map((p) => ({
      url: `${BASE_URL}/logements/${p.id}--${p.slug}`,
      lastModified: new Date(),
      priority: 0.7,
    }))
  } catch {
    // API indisponible au build : sitemap partiel sans les logements
  }

  return [...staticRoutes, ...propertyRoutes]
}
