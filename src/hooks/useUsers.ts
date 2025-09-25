import { useCallback, useContext, useMemo } from 'react'
import { UsersContext } from '../contexts/UsersContext/UsersContext'
import { User } from '../types'

export const useUsers = () => {
  const context = useContext(UsersContext)
  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider')
  }

  const { dispatch, state } = context

  const setContext = useCallback(
    (name: string, value: User[]) => {
      dispatch({ type: 'SET_CONTEXT', name, value })
    },
    [dispatch],
  )

  return useMemo(() => ({ state, setContext }), [state, setContext])
}
