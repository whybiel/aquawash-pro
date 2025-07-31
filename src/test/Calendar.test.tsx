import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Calendar } from '@/components/ui/calendar'

describe('Calendar', () => {
  it('deve renderizar o calendário corretamente', () => {
    render(<Calendar />)
  })
})
