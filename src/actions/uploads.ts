"use server"

// TODO: implémenter uploadImage
export async function uploadImage(_file: FormData): Promise<{ url: string }> {
  throw new Error("uploadImage — non implémenté")
}

// TODO: implémenter deleteImages (nettoyage des orphelins si annulation formulaire)
export async function deleteImages(_urls: string[]): Promise<void> {
  throw new Error("deleteImages — non implémenté")
}