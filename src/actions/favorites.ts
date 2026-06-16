"use server"

import type { Property } from "@/types/property"

// TODO: implémenter getFavorites
/** L'utilisateur est identifié par son token cookie, `userId` sert de filtre côté API. */
export async function getFavorites(_userId: number): Promise<Property[]> {
  throw new Error("getFavorites — non implémenté")
}

// TODO: implémenter addFavorite
/** @throws {ApiError} 409 si déjà en favori */
export async function addFavorite(_propertyId: string): Promise<void> {
  throw new Error("addFavorite — non implémenté")
}

// TODO: implémenter removeFavorite
/** @throws {ApiError} 404 si le favori n'existe pas */
export async function removeFavorite(_propertyId: string): Promise<void> {
  throw new Error("removeFavorite — non implémenté")
}