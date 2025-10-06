import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from '../../App'
import { UsersProvider } from '../../contexts/UsersContext/UsersContext'

describe('NewUserForm', () => {
  it('foo', async () => {
    render(
      <UsersProvider>
        <App />
      </UsersProvider>,
    )

    const loadingText = screen.queryByText('Loading...')
    expect(loadingText).toBeInTheDocument()

    await waitFor(() => {
      expect(loadingText).not.toBeInTheDocument()
    })

    const listElement = screen.getByRole('list')
    expect(listElement).toBeInTheDocument()
  })
})
