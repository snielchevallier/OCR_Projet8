"use server"

import type { Property } from "@/types/property"

// TODO: implémenter getFavorites
export async function getFavorites(_userId: number): Promise<Property[]> {
  throw new Error("getFavorites — non implémenté")
}

// TODO: implémenter addFavorite
export async function addFavorite(_propertyId: string): Promise<void> {
  throw new Error("addFavorite — non implémenté")
}

// TODO: implémenter removeFavorite
export async function removeFavorite(_propertyId: string): Promise<void> {
  throw new Error("removeFavorite — non implémenté")
}