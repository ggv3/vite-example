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

  const addError = useCallback(
    (error: ValidationError) => {
      dispatch({ type: 'ADD_ERROR', error })
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
    (id: string) => {
      const fieldValue = get(state, id) as string | number
      const fieldValidator = validators[id]
      if (!fieldValidator) return
      const errorMessage = fieldValidator(fieldValue, state)

      if (errorMessage) {
        addError({
          id,
          message: errorMessage,
          orderNumber: 1,
        })
      } else {
        removeError(id)
      }
    },
    [addError, removeError, state, validators],
  )

  return useMemo(
    () => ({ formValidationState, validateField }),
    [formValidationState, validateField],
  )
}
