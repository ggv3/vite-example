/// <reference types="vitest/globals" />

import { act, renderHook } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { FormValidationContext } from '../contexts/FormValidationContext/FormValidationContext'
import { useFormValidation } from './useFormValidation'

vi.stubGlobal('document', globalThis.document || {})
vi.stubGlobal('window', globalThis.window || {})

const mockDispatch = vi.fn()
const initialFormValidationState = {
  errors: [],
  isAlertVisible: false,
}

import { ValidationError } from '../contexts/FormValidationContext/FormValidationReducer'

type WrapperProps = {
  children: React.ReactNode
  formValidationState?: {
    errors: ValidationError[]
    isAlertVisible: boolean
  }
}

function Wrapper({ children, formValidationState = initialFormValidationState }: WrapperProps) {
  return (
    <FormValidationContext.Provider value={{ dispatch: mockDispatch, formValidationState }}>
      {children}
    </FormValidationContext.Provider>
  )
}

describe('useFormValidation', () => {
  beforeEach(() => {
    mockDispatch.mockClear()
  })

  it('throws error if used outside provider', () => {
    expect(() => {
      renderHook(() => useFormValidation({ state: {}, validators: {} }))
    }).toThrow('useFormValidation must be used within a FormValidationProvider')
  })

  it('validates field and adds error', () => {
    const state = { name: '' }
    const validators = {
      name: (value: string) => (value ? null : 'Name required'),
    }
    const { result } = renderHook(() => useFormValidation({ state, validators }), {
      wrapper: ({ children }) => <Wrapper>{children}</Wrapper>,
    })
    act(() => {
      result.current.validateField('name', 1)
    })
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_ERROR',
      error: { id: 'name', message: 'Name required', orderNumber: 1 },
    })
  })

  it('removes error when field is valid', () => {
    const state = { name: 'John' }
    const validators = {
      name: (value: string) => (value ? null : 'Name required'),
    }
    const formValidationState = {
      errors: [{ id: 'name', message: 'Name required', orderNumber: 1 }],
      isAlertVisible: false,
    }
    const { result } = renderHook(() => useFormValidation({ state, validators }), {
      wrapper: ({ children }) => (
        <Wrapper formValidationState={formValidationState}>{children}</Wrapper>
      ),
    })
    act(() => {
      result.current.validateField('name', 1)
    })
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'REMOVE_ERROR',
      id: 'name',
    })
  })

  it('updates error if already exists', () => {
    const state = { name: '' }
    const validators = {
      name: (value: string) => (value ? null : 'Name required'),
    }
    const formValidationState = {
      errors: [{ id: 'name', message: 'Old error', orderNumber: 1 }],
      isAlertVisible: false,
    }
    const { result } = renderHook(() => useFormValidation({ state, validators }), {
      wrapper: ({ children }) => (
        <Wrapper formValidationState={formValidationState}>{children}</Wrapper>
      ),
    })
    act(() => {
      result.current.validateField('name', 1)
    })
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_ERROR',
      error: { id: 'name', message: 'Name required', orderNumber: 1 },
    })
  })
})
