import { User } from '../types'

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  const data = (await response.json()) as User[]
  return data
}
