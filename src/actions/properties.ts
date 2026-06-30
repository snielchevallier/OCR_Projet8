'use server'

import { apiFetch } from '@/lib/api'
import { Property, PropertyDetail } from '@/types/property'

export async function getProperties(): Promise<Property[]> {
  if (process.env.USE_MOCK_DATA === 'true') {
    const { MOCK_PROPERTIES } = await import('@/lib/mock-data')
    return MOCK_PROPERTIES
  }
  return apiFetch<Property[]>('/api/properties')
}

export async function getProperty(id: string): Promise<PropertyDetail> {
  if (process.env.USE_MOCK_DATA === 'true') {
    const { MOCK_PROPERTIES } = await import('@/lib/mock-data')
    const found = MOCK_PROPERTIES.find((p) => p.id === id)
    if (!found) throw new Error('Logement introuvable')
    return found
  }
  return apiFetch<PropertyDetail>(`/api/properties/${id}`)
}