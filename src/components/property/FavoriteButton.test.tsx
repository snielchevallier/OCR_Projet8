import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FavoriteButton from './FavoriteButton'

describe('FavoriteButton', () => {
  test('aria-label indique "Ajouter aux favoris" par défaut', () => {
    render(<FavoriteButton propertyId="42" />)
    expect(screen.getByRole('button', { name: /ajouter aux favoris/i })).toBeInTheDocument()
  })

  test('aria-label indique "Retirer des favoris" quand isFavorite est true', () => {
    render(<FavoriteButton propertyId="42" isFavorite={true} />)
    expect(screen.getByRole('button', { name: /retirer des favoris/i })).toBeInTheDocument()
  })

  test('aria-pressed est false par défaut', () => {
    render(<FavoriteButton propertyId="42" />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
  })

  test('aria-pressed est true quand isFavorite est true', () => {
    render(<FavoriteButton propertyId="42" isFavorite={true} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })

  test('appelle onToggle au clic', async () => {
    const onToggle = vi.fn()
    render(<FavoriteButton propertyId="42" onToggle={onToggle} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onToggle).toHaveBeenCalledTimes(1)
  })
})
