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

  const validateField = useCallback(
    (id: string, orderNumber: number) => {
      const fieldValue = get(state, id) as string | number
      const fieldValidator = validators[id]
      // if (!fieldValidator) return

      const errorMessage = fieldValidator(fieldValue, state)
      const existingError = errors.find((err: ValidationError) => err.id === id)

      if (errorMessage) {
        const errorObj = {
          id,
          message: errorMessage,
          orderNumber,
        }
        if (existingError) {
          updateError(errorObj)
        } else {
          addError(errorObj)
        }
      } else {
        removeError(id)
      }
    },
    [state, validators, errors, updateError, addError, removeError],
  )

  return useMemo(
    () => ({ formValidationState, validateField }),
    [formValidationState, validateField],
  )
}
