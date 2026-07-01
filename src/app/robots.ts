import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/messagerie', '/logements/ajouter'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
