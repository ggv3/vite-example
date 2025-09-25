import { useCallback, useContext, useMemo } from 'react'
import { FormValidationContext } from '../contexts/FormValidationContext/FormValidationContext'
import { ValidationError } from '../contexts/FormValidationContext/FormValidationReducer'

interface UseFormValidationProps<T> {
  state: T
  validators: Record<keyof T, ((value: unknown, state?: T) => string | null)[]>
}

export const useFormValidation = <T>({ state, validators }: UseFormValidationProps<T>) => {
  const context = useContext(FormValidationContext)

  if (!context) {
    throw new Error('useFormValidation must be used within a FormValidationProvider')
  }

  const { dispatch } = context

  const { formValidationState } = context

  const addError = useCallback(
    (error: ValidationError) => {
      dispatch({ type: 'ADD_ERROR', error })
    },
    [dispatch],
  )

  const validateField = useCallback(
    (id: keyof T) => {
      const fieldValue = state[id]
      const fieldValidators = validators[id]
      fieldValidators.forEach((validator) => {
        const error = validator(fieldValue, state)
        if (error) {
          addError({
            id: id as string,
            message: error,
            orderNumber: 1,
          })
        }
      })
    },
    [addError, state, validators],
  )

  return useMemo(
    () => ({ formValidationState, validateField }),
    [formValidationState, validateField],
  )
}
