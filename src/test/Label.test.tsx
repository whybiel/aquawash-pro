import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Label } from '@/components/ui/label'

describe('Label', () => {
  it('deve renderizar o texto da label', () => {
    render(<Label htmlFor='email'>E-mail</Label>)

    const label = screen.getByText(/e-mail/i)
    expect(label).toBeInTheDocument()
    expect(label.tagName).toBe('LABEL')
  })
})
