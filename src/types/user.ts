export type User = {
  id: number
  name: string
  email: string
  picture: string | null
  role: 'client' | 'owner' | 'admin'
}