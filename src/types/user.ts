export type User = {
  id: number
  name: string
  picture: string | null
  role: 'client' | 'owner' | 'admin'
}