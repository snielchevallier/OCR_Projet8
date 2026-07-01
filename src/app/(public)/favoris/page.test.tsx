import { render, screen, waitFor } from '@testing-library/react'
import { useFavorites } from '@/context/FavoritesContext'
import { getProperties } from '@/actions/properties'
import type { Property } from '@/types/property'
import FavorisPage from './page'

vi.mock('@/context/FavoritesContext', () => ({
  useFavorites: vi.fn(),
}))

vi.mock('@/actions/properties', () => ({
  getProperties: vi.fn(),
}))

vi.mock('@/components/property/PropertyGrid', () => ({
  default: ({ properties }: { properties: Property[] }) => (
    <ul>{properties.map((p) => <li key={p.id}>{p.title}</li>)}</ul>
  ),
}))

vi.mock('@/components/ui/Spinner', () => ({
  default: () => <div data-testid="spinner" />,
}))

const mockProperties: Property[] = [
  {
    id: '1',
    slug: 'appartement-paris',
    title: 'Appartement Paris',
    description: 'Un bel appartement',
    cover: '/cover.jpg',
    location: 'Paris',
    price_per_night: 80,
    rating_avg: 4.5,
    ratings_count: 12,
    host: { id: 1, name: 'Alice', picture: null },
  },
  {
    id: '2',
    slug: 'maison-lyon',
    title: 'Maison Lyon',
    description: 'Une belle maison',
    cover: '/cover2.jpg',
    location: 'Lyon',
    price_per_night: 120,
    rating_avg: 4.8,
    ratings_count: 5,
    host: { id: 2, name: 'Bob', picture: null },
  },
]

beforeEach(() => {
  vi.clearAllMocks()
})

function mockFavorites(favoriteIds: string[]) {
  vi.mocked(useFavorites).mockReturnValue({
    favoriteIds,
    isFavorite: (id: string) => favoriteIds.includes(id),
    toggle: vi.fn(),
  })
}

describe('FavorisPage', () => {
  describe('structure', () => {
    test('affiche un h1 "Favoris"', () => {
      mockFavorites([])
      render(<FavorisPage />)
      expect(screen.getByRole('heading', { level: 1, name: /favoris/i })).toBeInTheDocument()
    })
  })

  describe('liste vide', () => {
    test('affiche le message vide et ne contacte pas le réseau quand favoriteIds est vide', () => {
      mockFavorites([])
      render(<FavorisPage />)
      expect(screen.getByText(/pas encore de logements favoris/i)).toBeInTheDocument()
      expect(getProperties).not.toHaveBeenCalled()
    })

    test("n'affiche pas le spinner quand favoriteIds est vide", () => {
      mockFavorites([])
      render(<FavorisPage />)
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
    })

    test('affiche le message vide si aucune propriété ne correspond aux favoriteIds', async () => {
      mockFavorites(['99'])
      vi.mocked(getProperties).mockResolvedValue(mockProperties)
      render(<FavorisPage />)
      await waitFor(() =>
        expect(screen.getByText(/pas encore de logements favoris/i)).toBeInTheDocument()
      )
    })
  })

  describe('chargement', () => {
    test('affiche le spinner pendant que getProperties charge', () => {
      mockFavorites(['1'])
      vi.mocked(getProperties).mockReturnValue(new Promise(() => {}))
      render(<FavorisPage />)
      expect(screen.getByTestId('spinner')).toBeInTheDocument()
    })

    test('masque le spinner une fois le chargement terminé', async () => {
      mockFavorites(['1'])
      vi.mocked(getProperties).mockResolvedValue(mockProperties)
      render(<FavorisPage />)
      await waitFor(() => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument())
    })
  })

  describe('avec favoris', () => {
    test('appelle getProperties quand favoriteIds est non vide', async () => {
      mockFavorites(['1'])
      vi.mocked(getProperties).mockResolvedValue(mockProperties)
      render(<FavorisPage />)
      await waitFor(() => expect(getProperties).toHaveBeenCalledTimes(1))
    })

    test("n'affiche que les propriétés dont l'id est dans favoriteIds", async () => {
      mockFavorites(['1'])
      vi.mocked(getProperties).mockResolvedValue(mockProperties)
      render(<FavorisPage />)
      await waitFor(() => {
        expect(screen.getByText('Appartement Paris')).toBeInTheDocument()
        expect(screen.queryByText('Maison Lyon')).not.toBeInTheDocument()
      })
    })

    test('affiche toutes les propriétés si tous leurs ids sont en favori', async () => {
      mockFavorites(['1', '2'])
      vi.mocked(getProperties).mockResolvedValue(mockProperties)
      render(<FavorisPage />)
      await waitFor(() => {
        expect(screen.getByText('Appartement Paris')).toBeInTheDocument()
        expect(screen.getByText('Maison Lyon')).toBeInTheDocument()
      })
    })
  })
})
