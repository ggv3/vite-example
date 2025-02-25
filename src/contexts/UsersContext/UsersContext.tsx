import { createContext, Dispatch } from 'react'
import { UsersAction, UsersContextState } from './UsersReducer'

type UsersContextType = {
  state: UsersContextState
  dispatch: Dispatch<UsersAction>
}

export const UsersContext = createContext<UsersContextType | undefined>(undefined)
