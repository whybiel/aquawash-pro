import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { LoginModal } from '@/components/auth/LoginModal'

describe('LoginModal', () => {
  const onCloseMock = vi.fn()

  beforeEach(() => {
    onCloseMock.mockClear()
  })

  it('deve renderizar o modal quando isOpen for true', () => {
    render(<LoginModal isOpen={true} onClose={onCloseMock} />)

    expect(screen.getByText(/entrar no sistema/i)).toBeInTheDocument()
  })

  it('não deve renderizar nada quando isOpen for false', () => {
    const { queryByText } = render(
      <LoginModal isOpen={false} onClose={onCloseMock} />
    )

    expect(queryByText(/entrar no sistema/i)).not.toBeInTheDocument()
  })

  it('deve chamar onClose quando modal for fechado com tecla Escape', () => {
    render(<LoginModal isOpen={true} onClose={onCloseMock} />)

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })

    expect(onCloseMock).toHaveBeenCalled()
  })
})
