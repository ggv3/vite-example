export interface ValidationError {
  id: string
  message: string
  orderNumber: number
}

export interface FormValidationContextState {
  errors: ValidationError[]
  isAlertVisible: boolean
}

export type FormValidationAction =
  | { type: 'TOGGLE_ALERT' }
  | { type: 'ADD_ERROR'; error: ValidationError }
  | { type: 'REMOVE_ERROR'; id: string }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'UPDATE_ERROR'; error: ValidationError }

export const FormValidationReducer = (
  formValidationState: FormValidationContextState,
  action: FormValidationAction,
): FormValidationContextState => {
  switch (action.type) {
    case 'TOGGLE_ALERT': {
      return { ...formValidationState, isAlertVisible: !formValidationState.isAlertVisible }
    }
    case 'ADD_ERROR': {
      return {
        ...formValidationState,
        errors: [...formValidationState.errors, action.error],
      }
    }

    case 'REMOVE_ERROR': {
      return {
        ...formValidationState,
        errors: formValidationState.errors.filter((error) => error.id !== action.id),
      }
    }

    case 'CLEAR_ERRORS': {
      return { ...formValidationState, errors: [] }
    }

    case 'UPDATE_ERROR': {
      return {
        ...formValidationState,
        errors: formValidationState.errors.map((error) =>
          error.id === action.error.id ? { ...error, message: action.error.message } : error,
        ),
      }
    }
    default: {
      return formValidationState
    }
  }
}
