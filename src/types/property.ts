import type { User } from './user'

export type Property = {
  /** Identifiant string (ex. `"42"`). L'URL de détail est construite sous la forme `${id}--${slug}`. */
  id: string
  slug: string
  title: string
  description: string
  cover: string
  location: string
  price_per_night: number
  rating_avg: number
  ratings_count: number
  host: Pick<User, 'id' | 'name' | 'picture'>
}

export type PropertyDetail = Property & {
  pictures: string[]
  equipments: string[]
  tags: string[]
}