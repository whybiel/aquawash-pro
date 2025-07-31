import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Input } from '@/components/ui/input'

describe('Input', () => {
  it('deve renderizar o input com placeholder', () => {
    render(<Input placeholder='Digite seu nome' />)

    const input = screen.getByPlaceholderText(/digite seu nome/i)
    expect(input).toBeInTheDocument()
    expect(input).toBeEnabled()
  })
})
