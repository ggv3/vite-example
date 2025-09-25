import { FC, useContext } from 'react'
import { FormValidationContext } from '../../contexts/FormValidationContext/FormValidationContext'

export const ValidationAlert: FC = () => {
  const context = useContext(FormValidationContext)

  if (!context) {
    throw new Error('useFormValidation must be used within a FormValidationProvider')
  }
  const { formValidationState } = context
  const { errors } = formValidationState

  if (errors.length === 0) {
    return null
  }

  return (
    <div>
      <h2>Validation Errors:</h2>
      <ul>
        {errors.map((error) => (
          <li key={error.id}>{error.message}</li>
        ))}
      </ul>
    </div>
  )
}
