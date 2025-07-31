import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('deve renderizar com o texto fornecido', () => {
    render(<Button>Enviar</Button>)

    const button = screen.getByRole('button', { name: /enviar/i })

    expect(button).toBeInTheDocument()
    expect(button).toBeEnabled()
  })
})
