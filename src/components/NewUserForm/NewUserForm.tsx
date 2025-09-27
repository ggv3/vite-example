import { FC, useState } from 'react'
import { useFormValidation } from '../../hooks/useFormValidation'
import { userFormValidators } from '../../validators/useFormValidators'
import { FormValidationAlert } from '../FormValidationAlert/FormValidationAlert'

interface NewUserState {
  firstName: string
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

  const { validateField } = useFormValidation({ state: user, validators: userFormValidators })
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
