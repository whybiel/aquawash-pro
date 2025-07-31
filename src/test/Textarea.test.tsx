import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Textarea } from '@/components/ui/textarea'

describe('Textarea', () => {
  it('deve renderizar o textarea com placeholder', () => {
    render(<Textarea placeholder='Digite sua mensagem' />)

    const textarea = screen.getByPlaceholderText(/digite sua mensagem/i)
    expect(textarea).toBeInTheDocument()
    expect(textarea).toBeEnabled()
  })
})
