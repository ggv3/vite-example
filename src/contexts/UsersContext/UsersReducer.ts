import { User } from '../../types'

export interface UsersContextState {
  users: User[]
}

export type UsersAction = { type: 'SET_CONTEXT'; name: string; value: User[] }

export const UsersReducer = (state: UsersContextState, action: UsersAction): UsersContextState => {
  switch (action.type) {
    case 'SET_CONTEXT': {
      return { ...state, [action.name]: action.value }
    }
    default: {
      return state
    }
  }
}
