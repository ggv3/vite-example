import get from 'lodash/get'
import { useCallback, useContext, useMemo } from 'react'
import { FormValidationContext } from '../contexts/FormValidationContext/FormValidationContext'
import { ValidationError } from '../contexts/FormValidationContext/FormValidationReducer'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Validator<T> = (value: any, state?: T) => string | null
type Validators<T> = Record<string, Validator<T>>

interface UseFormValidationProps<T> {
  state: T
  validators: Validators<T>
}

export const useFormValidation = <T>({ state, validators }: UseFormValidationProps<T>) => {
  const context = useContext(FormValidationContext)

  if (!context) {
    throw new Error('useFormValidation must be used within a FormValidationProvider')
  }

  const { dispatch, formValidationState } = context
  const { errors } = formValidationState

  const addError = useCallback(
    (error: ValidationError) => {
      dispatch({ type: 'ADD_ERROR', error })
    },
    [dispatch],
  )

  const addErrors = useCallback(
    (errors: ValidationError[]) => {
      dispatch({ type: 'ADD_ERRORS', errors })
    },
    [dispatch],
  )

  const updateError = useCallback(
    (error: ValidationError) => {
      dispatch({ type: 'UPDATE_ERROR', error })
    },
    [dispatch],
  )

  const removeError = useCallback(
    (id: string) => {
      dispatch({ type: 'REMOVE_ERROR', id })
    },
    [dispatch],
  )

  const toggleAlert = useCallback(
    (isVisible: boolean) => {
      dispatch({ type: 'TOGGLE_ALERT', isVisible })
    },
    [dispatch],
  )

  const validateField = useCallback(
    (id: string, orderNumber: number) => {
      const fieldValue = get(state, id) as string | number
      const fieldValidator = validators[id]

      const errorMessage = fieldValidator(fieldValue, state)
      const existingError = errors.find((err: ValidationError) => err.id === id)

      if (errorMessage) {
        const errorObj: ValidationError = { id, message: errorMessage, orderNumber }
        if (existingError) {
          updateError(errorObj)
        } else {
          addError(errorObj)
        }
      } else if (existingError) {
        removeError(id)
      }

      // After adding/updating/removing, update alert visibility
      const newErrors: ValidationError[] = Object.keys(validators)
        .map((id, index) => {
          const fieldValue = get(state, id) as string | number
          const fieldValidator = validators[id]
          const errorMessage = fieldValidator(fieldValue, state)
          return errorMessage ? { id, message: errorMessage, orderNumber: index } : null
        })
        .filter((e): e is ValidationError => e !== null)

      if (newErrors.length === 0) {
        toggleAlert(false)
      }
    },
    [state, validators, errors, toggleAlert, updateError, addError, removeError],
  )

  const validateAll = useCallback(() => {
    // Build fresh errors instead of relying on context state
    const newErrors: ValidationError[] = Object.keys(validators)
      .map((id, index) => {
        const fieldValue = get(state, id) as string | number
        const fieldValidator = validators[id]
        const errorMessage = fieldValidator(fieldValue, state)
        return errorMessage ? { id, message: errorMessage, orderNumber: index } : null
      })
      .filter((e): e is ValidationError => e !== null)

    // Replace errors in one go
    addErrors(newErrors)

    // Update alert visibility immediately
    toggleAlert(newErrors.length > 0)

    return newErrors
  }, [validators, addErrors, toggleAlert, state])

  return useMemo(
    () => ({ formValidationState, validateField, validateAll }),
    [formValidationState, validateAll, validateField],
  )
}
