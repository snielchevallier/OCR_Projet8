"use server"

import type { User } from "@/types/user"

// TODO: implémenter loginUser
export async function loginUser(_email: string, _password: string): Promise<{ token: string; user: User }> {
  throw new Error("loginUser — non implémenté")
}

// TODO: implémenter registerUser
export async function registerUser(_name: string, _email: string, _password: string): Promise<{ token: string; user: User }> {
  throw new Error("registerUser — non implémenté")
}

// TODO: implémenter logoutUser
export async function logoutUser(): Promise<void> {
  throw new Error("logoutUser — non implémenté")
}