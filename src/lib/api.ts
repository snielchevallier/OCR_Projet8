import { cookies } from 'next/headers'

const API_URL = process.env.BACKEND_API_URL

type ApiOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
}

/** Erreur HTTP avec le status code associé. */
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * Appelle l'API backend avec le token JWT du cookie `token` si présent.
 * @param endpoint - Chemin relatif ex. `"/api/properties"`
 * @param options - Méthode HTTP et corps de la requête
 * @returns Les données JSON typées `T`
 * @throws {ApiError} 401 si session expirée, 503 si serveur inaccessible, autre status HTTP sinon
 */
export async function apiFetch<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  let res: Response
  try {
    res = await fetch(`${API_URL}${endpoint}`, {
      method: options.method ?? 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(options.body ? { body: JSON.stringify(options.body) } : {}),
    })
  } catch {
    throw new ApiError(503, 'Serveur inaccessible, veuillez réessayer plus tard')
  }
  if (res.status === 401) {
    throw new ApiError(401, 'Session expirée, veuillez vous reconnecter')
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new ApiError(res.status, data.error ?? `Erreur ${res.status}`)
  }

  if (res.status === 204) return undefined as T

  return res.json() as Promise<T>
}