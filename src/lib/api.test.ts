import { apiFetch, ApiError } from './api'
import { cookies } from 'next/headers'

vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}))

const mockCookies = (token?: string) => {
  vi.mocked(cookies).mockResolvedValue({
    get: () => (token ? { value: token } : undefined),
  } as any)
}

const makeFetch = (overrides: { ok?: boolean; status?: number; json?: () => Promise<unknown> } = {}) =>
  vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: () => Promise.resolve({}),
    ...overrides,
  })

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('ApiError', () => {
  test('assigne status, message et name', () => {
    const err = new ApiError(404, 'Not found')
    expect(err.status).toBe(404)
    expect(err.message).toBe('Not found')
    expect(err.name).toBe('ApiError')
    expect(err).toBeInstanceOf(Error)
  })
})

describe('apiFetch', () => {
  describe('réponses nominales', () => {
    test('retourne le JSON pour une réponse 200', async () => {
      mockCookies()
      vi.stubGlobal('fetch', makeFetch({ json: () => Promise.resolve({ id: 1 }) }))
      await expect(apiFetch('/api/test')).resolves.toEqual({ id: 1 })
    })

    test('retourne undefined pour une réponse 204', async () => {
      mockCookies()
      vi.stubGlobal('fetch', makeFetch({ status: 204 }))
      await expect(apiFetch<undefined>('/api/test')).resolves.toBeUndefined()
    })
  })

  describe('token', () => {
    test('ajoute Authorization si le cookie token est présent', async () => {
      mockCookies('my-token')
      const fetchMock = makeFetch()
      vi.stubGlobal('fetch', fetchMock)
      await apiFetch('/api/test')
      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: 'Bearer my-token' }),
        })
      )
    })

    test("n'ajoute pas Authorization si le cookie token est absent", async () => {
      mockCookies()
      const fetchMock = makeFetch()
      vi.stubGlobal('fetch', fetchMock)
      await apiFetch('/api/test')
      const { headers } = fetchMock.mock.calls[0][1] as RequestInit
      expect(headers).not.toHaveProperty('Authorization')
    })
  })

  describe('options de requête', () => {
    test('utilise GET par défaut sans body', async () => {
      mockCookies()
      const fetchMock = makeFetch()
      vi.stubGlobal('fetch', fetchMock)
      await apiFetch('/api/test')
      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ method: 'GET' })
      )
      expect(fetchMock.mock.calls[0][1]).not.toHaveProperty('body')
    })

    test('passe la méthode et le body sérialisé', async () => {
      mockCookies()
      const fetchMock = makeFetch()
      vi.stubGlobal('fetch', fetchMock)
      await apiFetch('/api/test', { method: 'POST', body: { name: 'test' } })
      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ name: 'test' }),
        })
      )
    })
  })

  describe('erreurs', () => {
    test('lève ApiError(503) si fetch throw (réseau inaccessible)', async () => {
      mockCookies()
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))
      await expect(apiFetch('/api/test')).rejects.toMatchObject({
        status: 503,
        message: 'Serveur inaccessible, veuillez réessayer plus tard',
      })
    })

    test('lève ApiError(401) pour une réponse 401', async () => {
      mockCookies()
      vi.stubGlobal('fetch', makeFetch({ ok: false, status: 401 }))
      await expect(apiFetch('/api/test')).rejects.toMatchObject({
        status: 401,
        message: 'Session expirée, veuillez vous reconnecter',
      })
    })

    test('lève ApiError avec data.error si la réponse est non-ok', async () => {
      mockCookies()
      vi.stubGlobal('fetch', makeFetch({ ok: false, status: 422, json: () => Promise.resolve({ error: 'Champ invalide' }) }))
      await expect(apiFetch('/api/test')).rejects.toMatchObject({
        status: 422,
        message: 'Champ invalide',
      })
    })

    test('utilise le message fallback si data.error est absent', async () => {
      mockCookies()
      vi.stubGlobal('fetch', makeFetch({ ok: false, status: 500, json: () => Promise.resolve({}) }))
      await expect(apiFetch('/api/test')).rejects.toMatchObject({
        status: 500,
        message: 'Erreur 500',
      })
    })

    test('utilise le fallback si res.json() échoue', async () => {
      mockCookies()
      vi.stubGlobal('fetch', makeFetch({ ok: false, status: 500, json: () => Promise.reject(new Error('parse error')) }))
      await expect(apiFetch('/api/test')).rejects.toMatchObject({
        status: 500,
        message: 'Erreur 500',
      })
    })
  })
})
