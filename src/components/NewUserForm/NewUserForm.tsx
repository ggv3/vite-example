import { FC, useState } from 'react'
import { useFormValidation } from '../../hooks/useFormValidation'
import { FormValidationAlert } from '../FormValidationAlert/FormValidationAlert'

interface NewUserState {
  firstName: string
}

const requiredValidator = <T,>(value: unknown, _state?: T) => {
  if (typeof value === 'string' || typeof value === 'number') {
    if (value.toString().trim() === '') {
      return 'required'
    }
  }
  return null
}

const validators = {
  firstName: [requiredValidator],
}

export const NewUserForm = () => {
  return (
    <>
      <h2>Instert a new user</h2>
      <FormValidationAlert>
        <Form />
      </FormValidationAlert>
    </>
  )
}

export const Form: FC = () => {
  const [user, setUser] = useState<NewUserState>({
    firstName: '',
  })

  const { validateField } = useFormValidation({ state: user, validators })
  return (
    <form>
      <input
        type="text"
        id="firstName"
        name="firstName"
        onChange={(event) => {
          setUser({ ...user, firstName: event.target.value })
        }}
        onBlur={() => {
          validateField('firstName')
        }}
      />
    </form>
  )
}
