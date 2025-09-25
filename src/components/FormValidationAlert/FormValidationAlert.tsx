import { FC, ReactNode } from 'react'
import { FormValidationProvider } from '../../contexts/FormValidationContext/FormValidationContext'
import { ValidationAlert } from '../ValidationAlert/ValidationAlert'

interface FormValidationAlertProps {
  children: ReactNode
}

export const FormValidationAlert: FC<FormValidationAlertProps> = (props) => {
  const { children } = props
  return (
    <FormValidationProvider>
      <ValidationAlert />
      {children}
    </FormValidationProvider>
  )
}
