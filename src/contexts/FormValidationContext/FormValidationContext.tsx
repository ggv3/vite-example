import { createContext, Dispatch, ReactNode, useReducer } from 'react'
import {
  FormValidationAction,
  FormValidationContextState,
  FormValidationReducer,
} from './FormValidationReducer'

type FormValidationContextType = {
  formValidationState: FormValidationContextState
  dispatch: Dispatch<FormValidationAction>
}
const FormValidationContext = createContext<FormValidationContextType | undefined>(undefined)

const initialState: FormValidationContextState = {
  errors: [],
  isAlertVisible: false,
}

const FormValidationProvider = ({ children }: { children: ReactNode }) => {
  const [formValidationState, dispatch] = useReducer(FormValidationReducer, initialState)
  return (
    <FormValidationContext.Provider value={{ formValidationState, dispatch }}>
      {children}
    </FormValidationContext.Provider>
  )
}

export { FormValidationContext, FormValidationProvider }
