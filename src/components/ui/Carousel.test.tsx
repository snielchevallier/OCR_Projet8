import { render, screen } from '@testing-library/react'
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
  test('affiche le compteur correct à l\'index initial', () => {
    render(<Carousel {...defaultProps} initialIndex={1} />)
    expect(screen.getByText('2 / 3')).toBeInTheDocument()
  })
})
