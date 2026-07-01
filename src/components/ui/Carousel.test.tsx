import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Carousel from './Carousel'

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}))

vi.mock('@/lib/image', () => ({ BLUR_PLACEHOLDER: 'data:image/gif;base64,R0l' }))

const images = ['/img1.jpg', '/img2.jpg', '/img3.jpg']
const defaultProps = {
  images,
  initialIndex: 0,
  title: 'Appartement test',
  onClose: vi.fn(),
}

describe('Carousel', () => {
  beforeEach(() => {
    defaultProps.onClose.mockClear()
  })

  test('affiche le compteur correct à l\'index initial', () => {
    render(<Carousel {...defaultProps} initialIndex={1} />)
    const counter = screen.getByText('2 / 3')
    expect(counter).toBeInTheDocument()
    expect(counter.tagName).toBe('P')
  })

  describe('navigation circulaire', () => {
    test('bouton suivant sur la dernière image revient à la première', async () => {
      render(<Carousel {...defaultProps} initialIndex={2} />)
      await userEvent.click(screen.getByRole('button', { name: /photo suivante/i }))
      expect(screen.getByText('1 / 3').tagName).toBe('P')
    })

    test('bouton précédent sur la première image va à la dernière', async () => {
      render(<Carousel {...defaultProps} initialIndex={0} />)
      await userEvent.click(screen.getByRole('button', { name: /photo précédente/i }))
      expect(screen.getByText('3 / 3').tagName).toBe('P')
    })

    test('ArrowRight sur la dernière image revient à la première', () => {
      render(<Carousel {...defaultProps} initialIndex={2} />)
      fireEvent.keyDown(window, { key: 'ArrowRight' })
      expect(screen.getByText('1 / 3').tagName).toBe('P')
    })

    test('ArrowLeft sur la première image va à la dernière', () => {
      render(<Carousel {...defaultProps} initialIndex={0} />)
      fireEvent.keyDown(window, { key: 'ArrowLeft' })
      expect(screen.getByText('3 / 3').tagName).toBe('P')
    })
  })

  describe('fermeture', () => {
    test('clic sur le bouton fermer appelle onClose', async () => {
      render(<Carousel {...defaultProps} />)
      await userEvent.click(screen.getByRole('button', { name: /fermer le carrousel/i }))
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
    })

    test('touche Escape appelle onClose', () => {
      render(<Carousel {...defaultProps} />)
      fireEvent.keyDown(window, { key: 'Escape' })
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('accessibilité', () => {
    test('la dialog a un aria-label contenant le titre', () => {
      render(<Carousel {...defaultProps} />)
      expect(screen.getByRole('dialog', { name: /Appartement test/i })).toBeInTheDocument()
    })

    test("l'alt de l'image est descriptif", () => {
      render(<Carousel {...defaultProps} initialIndex={0} />)
      expect(screen.getByAltText('Photo 1 sur 3 de Appartement test')).toBeInTheDocument()
    })
  })

  describe('cas limite', () => {
    test('image unique : boutons suivant et précédent absents', () => {
      render(<Carousel {...defaultProps} images={['/img1.jpg']} />)
      expect(screen.queryByRole('button', { name: /photo suivante/i })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /photo précédente/i })).not.toBeInTheDocument()
    })
  })
})
