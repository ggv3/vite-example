import { FC, useState } from 'react'
import { FormValidationProvider } from '../../contexts/FormValidationContext/FormValidationContext'
import { useFormValidation } from '../../hooks/useFormValidation'
import { userFormValidators } from '../../validators/userFormValidators'
import { ValidationAlert } from '../ValidationAlert/ValidationAlert'
import './NewUserForm.css'

interface NewUserState {
  firstName: string
  lastName: string
}

export const NewUserForm = () => {
  return (
    <>
      <h2>Instert a new user</h2>
      <FormValidationProvider>
        <Form />
      </FormValidationProvider>
    </>
  )
}

export const Form: FC = () => {
  const [user, setUser] = useState<NewUserState>({
    firstName: '',
    lastName: '',
  })

  const { validateField, validateAll } = useFormValidation({
    state: user,
    validators: userFormValidators,
  })
  return (
    <>
      <ValidationAlert />

      <form className="form">
        <input
          id="firstName"
          name="firstName"
          onChange={(event) => {
            setUser({ ...user, firstName: event.target.value })
          }}
          onBlur={() => {
            validateField('firstName', 0)
          }}
        />

        <input
          id="lastName"
          name="lastName"
          onChange={(event) => {
            setUser({ ...user, lastName: event.target.value })
          }}
          onBlur={() => {
            validateField('lastName', 1)
          }}
        />

        <button
          onClick={(event) => {
            event.preventDefault()
            validateAll()
          }}
        >
          validate all
        </button>
      </form>
    </>
  )
}
