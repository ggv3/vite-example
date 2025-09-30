export const firstNameValidator = (value: string) => {
  if (value.trim() === '') {
    return 'required'
  }

  if (value.includes('a')) {
    return 'forbidden letter'
  }

  return null
}

export const lastNameValidator = (value: string) => {
  if (value.trim() === '') {
    return 'required'
  }

  if (value.includes('b')) {
    return 'forbidden letter'
  }

  return null
}

export const userFormValidators = {
  firstName: firstNameValidator,
  lastName: lastNameValidator,
}
