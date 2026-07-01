"use server"

// TODO: implémenter uploadImage
/**
 * @param _file - `FormData` avec un champ `file` contenant l'image
 * @returns URL publique de l'image uploadée
 */
export async function uploadImage(_file: FormData): Promise<{ url: string }> {
  throw new Error("uploadImage — non implémenté")
}

// TODO: implémenter deleteImages (nettoyage des orphelins si annulation formulaire)
/**
 * Supprime les images uploadées mais non associées à un logement (abandon du formulaire).
 * @param _urls - URLs retournées par `uploadImage`
 */
export async function deleteImages(_urls: string[]): Promise<void> {
  throw new Error("deleteImages — non implémenté")
}