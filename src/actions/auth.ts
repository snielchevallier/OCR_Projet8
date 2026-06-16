"use server"

import type { User } from "@/types/user"

// TODO: implémenter loginUser
/** @throws {ApiError} 401 si identifiants invalides */
export async function loginUser(_email: string, _password: string): Promise<{ token: string; user: User }> {
  throw new Error("loginUser — non implémenté")
}

// TODO: implémenter registerUser
/** @throws {ApiError} 409 si l'email est déjà utilisé */
export async function registerUser(_name: string, _email: string, _password: string): Promise<{ token: string; user: User }> {
  throw new Error("registerUser — non implémenté")
}

// TODO: implémenter logoutUser
/** Supprime le cookie `token` côté serveur. */
export async function logoutUser(): Promise<void> {
  throw new Error("logoutUser — non implémenté")
}