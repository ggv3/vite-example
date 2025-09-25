import { FC, useEffect } from 'react'
import './App.css'

import { Header } from './components/Header/Header'
import { NewUserForm } from './components/NewUserForm/NewUserForm'
import { useApi } from './hooks/useApi'
import { useUsers } from './hooks/useUsers'
import { fetchUsers } from './services/userService'

export const App: FC = () => {
  const { data, fetchData, loading } = useApi(fetchUsers)
  const { state, setContext } = useUsers()

  const { users } = state

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (data && !users.length) {
      setContext('users', data)
    }
  }, [data, setContext, users.length])

  return (
    <>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}

      <NewUserForm />
    </>
  )
}
