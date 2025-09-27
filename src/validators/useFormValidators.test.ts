import { describe, expect, it } from 'vitest'
import { firstNameValidator, userFormValidators } from './useFormValidators'

describe('firstNameValidator', () => {
  it('returns "required" for empty string', () => {
    expect(firstNameValidator('')).toBe('required')
    expect(firstNameValidator('   ')).toBe('required')
  })

  it('returns "forbidden letter" if value contains "a"', () => {
    expect(firstNameValidator('adam')).toBe('forbidden letter')
    expect(firstNameValidator('cat')).toBe('forbidden letter')
  })

  it('returns null for valid input', () => {
    expect(firstNameValidator('John')).toBeNull()
    expect(firstNameValidator('Steve')).toBeNull()
  })
})

describe('userFormValidators', () => {
  it('firstName uses firstNameValidator', () => {
    expect(userFormValidators.firstName('')).toBe('required')
    expect(userFormValidators.firstName('alex')).toBe('forbidden letter')
    expect(userFormValidators.firstName('Bob')).toBeNull()
  })
})
