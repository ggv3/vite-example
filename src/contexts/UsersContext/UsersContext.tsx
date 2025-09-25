import { createContext, Dispatch, ReactNode, useReducer } from 'react'
import { UsersAction, UsersContextState, UsersReducer } from './UsersReducer'

type UsersContextType = {
  state: UsersContextState
  dispatch: Dispatch<UsersAction>
}
const UsersContext = createContext<UsersContextType | undefined>(undefined)

const initialState: UsersContextState = {
  users: [],
}

const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(UsersReducer, initialState)
  return <UsersContext.Provider value={{ state, dispatch }}>{children}</UsersContext.Provider>
}

export { UsersContext, UsersProvider }
