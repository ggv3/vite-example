import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FormValidationContext } from '../../contexts/FormValidationContext/FormValidationContext'
import { ValidationError } from '../../contexts/FormValidationContext/FormValidationReducer'
import { ValidationAlert } from './ValidationAlert'

describe('ValidationAlert', () => {
  const mockProvider = (errors: ValidationError[]) => {
    const mockDispatch = () => {}
    return (
      <FormValidationContext.Provider
        value={{ formValidationState: { errors, isAlertVisible: true }, dispatch: mockDispatch }}
      >
        <ValidationAlert />
      </FormValidationContext.Provider>
    )
  }

  it('renders nothing when there are no errors', () => {
    const { container } = render(mockProvider([]))
    expect(container.firstChild).toBeNull()
  })

  it('renders a list of errors sorted by orderNumber', () => {
    const errors: ValidationError[] = [
      { id: '2', message: 'Second error', orderNumber: 2 },
      { id: '1', message: 'First error', orderNumber: 1 },
    ]
    render(mockProvider(errors))
    expect(screen.getByText('Validation Errors:')).toBeInTheDocument()
    const items = screen.getAllByRole('listitem')
    expect(items[0]).toHaveTextContent('1: First error')
    expect(items[1]).toHaveTextContent('2: Second error')
  })

  it('throws error if context is missing', () => {
    const originalError = console.error
    console.error = () => {}
    expect(() => render(<ValidationAlert />)).toThrow(
      'useFormValidation must be used within a FormValidationProvider',
    )
    console.error = originalError
  })
})
