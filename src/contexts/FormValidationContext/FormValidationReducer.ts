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
  | { type: 'TOGGLE_ALERT'; isVisible: boolean }
  | { type: 'ADD_ERROR'; error: ValidationError }
  | { type: 'ADD_ERRORS'; errors: ValidationError[] }
  | { type: 'REMOVE_ERROR'; id: string }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'UPDATE_ERROR'; error: ValidationError }

export const FormValidationReducer = (
  formValidationState: FormValidationContextState,
  action: FormValidationAction,
): FormValidationContextState => {
  switch (action.type) {
    case 'TOGGLE_ALERT': {
      return { ...formValidationState, isAlertVisible: action.isVisible }
    }

    case 'ADD_ERROR': {
      return {
        ...formValidationState,
        errors: [...formValidationState.errors, action.error],
      }
    }

    case 'ADD_ERRORS': {
      return {
        ...formValidationState,
        errors: action.errors,
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
