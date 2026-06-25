import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useFavorites } from '@/context/FavoritesContext'
import type { Property } from '@/types/property'
import PropertyCard from './PropertyCard'

vi.mock('next/image', () => ({
  default: ({
    fill: _fill,
    blurDataURL: _blurDataURL,
    placeholder: _placeholder,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    fill?: boolean
    blurDataURL?: string
    placeholder?: string
  }) => <img {...props} />,
}))

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

vi.mock('@/context/FavoritesContext', () => ({
  useFavorites: vi.fn(),
}))

const mockProperty: Property = {
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
}

describe('PropertyCard', () => {
  let mockToggle: ReturnType<typeof vi.fn>
  let toggle: (id: string) => void

  beforeEach(() => {
    mockToggle = vi.fn()
    toggle = mockToggle as unknown as (id: string) => void
  })

  test('affiche le bouton "Ajouter aux favoris" quand non favori', () => {
    vi.mocked(useFavorites).mockReturnValue({ favoriteIds: [], isFavorite: () => false, toggle })
    render(<PropertyCard property={mockProperty} />)
    expect(screen.getByRole('button', { name: /ajouter aux favoris/i })).toBeInTheDocument()
  })

  test('affiche le bouton "Retirer des favoris" quand favori', () => {
    vi.mocked(useFavorites).mockReturnValue({ favoriteIds: ['1'], isFavorite: () => true, toggle })
    render(<PropertyCard property={mockProperty} />)
    expect(screen.getByRole('button', { name: /retirer des favoris/i })).toBeInTheDocument()
  })

  test("appelle toggle avec l'id au clic sur le bouton favori", async () => {
    vi.mocked(useFavorites).mockReturnValue({ favoriteIds: [], isFavorite: () => false, toggle })
    render(<PropertyCard property={mockProperty} />)
    await userEvent.click(screen.getByRole('button', { name: /ajouter aux favoris/i }))
    expect(mockToggle).toHaveBeenCalledWith('1')
  })

  test('affiche le titre et la localisation du logement', () => {
    vi.mocked(useFavorites).mockReturnValue({ favoriteIds: [], isFavorite: () => false, toggle })
    render(<PropertyCard property={mockProperty} />)
    expect(screen.getByText('Appartement Paris')).toBeInTheDocument()
    expect(screen.getByText('Paris')).toBeInTheDocument()
  })
})
