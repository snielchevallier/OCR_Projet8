'use server'

import { apiFetch } from '@/lib/api'
import { Property, PropertyDetail } from '@/types/property';

export async function getProperties(): Promise<Property[]> {
  return apiFetch<Property[]>('/api/properties')
}

export async function getProperty(id: string): Promise<PropertyDetail> {
  return apiFetch<PropertyDetail>(`/api/properties/${id}`)
}