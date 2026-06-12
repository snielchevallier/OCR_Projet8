'use server'

import { apiFetch } from '@/lib/api'
import { Property } from '@/types/property';

export async function getProperties(): Promise<Property[]> {
  return apiFetch<Property[]>('/api/properties')
}