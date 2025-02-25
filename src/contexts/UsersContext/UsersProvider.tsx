import { ReactNode, useReducer } from 'react'

import { UsersContext } from './UsersContext'
import { UsersContextState, UsersReducer } from './UsersReducer'

const initialState: UsersContextState = {
  users: [],
}

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(UsersReducer, initialState)
  return <UsersContext.Provider value={{ state, dispatch }}>{children}</UsersContext.Provider>
}
