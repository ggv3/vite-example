import { describe, expect, it } from 'vitest'
import {
  FormValidationContextState,
  FormValidationReducer,
  ValidationError,
} from './FormValidationReducer'

const initialState: FormValidationContextState = {
  errors: [],
  isAlertVisible: false,
}

describe('TOGGLE_ALERT', () => {
  it('toggles alert visibility', () => {
    const state = { ...initialState, isAlertVisible: false }
    const newState = FormValidationReducer(state, { type: 'TOGGLE_ALERT' })
    expect(newState.isAlertVisible).toBe(true)
    const toggledState = FormValidationReducer(newState, { type: 'TOGGLE_ALERT' })
    expect(toggledState.isAlertVisible).toBe(false)
  })
})

describe('ADD_ERROR', () => {
  it('adds a new error', () => {
    const error: ValidationError = { id: '1', message: 'Required', orderNumber: 1 }
    const newState = FormValidationReducer(initialState, { type: 'ADD_ERROR', error })
    expect(newState.errors).toHaveLength(1)
    expect(newState.errors[0]).toEqual(error)
  })

  it('updates an existing error when adding with same id', () => {
    const error1: ValidationError = { id: '1', message: 'Required', orderNumber: 1 }
    const error2: ValidationError = { id: '1', message: 'Invalid', orderNumber: 2 }
    const state = { ...initialState, errors: [error1] }
    const newState = FormValidationReducer(state, { type: 'ADD_ERROR', error: error2 })
    expect(newState.errors).toHaveLength(1)
    expect(newState.errors[0]).toEqual({ ...error1, ...error2 })
  })
})

describe('REMOVE_ERROR', () => {
  it('removes an error by id', () => {
    const error1: ValidationError = { id: '1', message: 'Required', orderNumber: 1 }
    const error2: ValidationError = { id: '2', message: 'Invalid', orderNumber: 2 }
    const state = { ...initialState, errors: [error1, error2] }
    const newState = FormValidationReducer(state, { type: 'REMOVE_ERROR', id: '1' })
    expect(newState.errors).toHaveLength(1)
    expect(newState.errors[0]).toEqual(error2)
  })
})

describe('CLEAR_ERRORS', () => {
  it('clears all errors', () => {
    const error1: ValidationError = { id: '1', message: 'Required', orderNumber: 1 }
    const state = { ...initialState, errors: [error1] }
    const newState = FormValidationReducer(state, { type: 'CLEAR_ERRORS' })
    expect(newState.errors).toHaveLength(0)
  })
})

describe('UPDATE_ERROR', () => {
  it('updates error message by id', () => {
    const error1: ValidationError = { id: '1', message: 'Required', orderNumber: 1 }
    const state = { ...initialState, errors: [error1] }
    const updatedError: ValidationError = { id: '1', message: 'Updated', orderNumber: 1 }
    const newState = FormValidationReducer(state, { type: 'UPDATE_ERROR', error: updatedError })
    expect(newState.errors[0].message).toBe('Updated')
    expect(newState.errors[0].orderNumber).toBe(1)
  })
})

it('returns state for unknown action', () => {
  // @ts-expect-error Testing unknown action type for reducer
  const newState = FormValidationReducer(initialState, { type: 'UNKNOWN' })
  expect(newState).toEqual(initialState)
})
