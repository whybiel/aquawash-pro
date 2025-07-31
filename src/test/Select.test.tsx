import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem
} from '@/components/ui/select'

describe('Select', () => {
  it('deve renderizar e abrir o Select mostrando as opções', async () => {
    render(
      <Select defaultValue='op1'>
        <SelectTrigger />
        <SelectContent>
          <SelectItem value='op1'>Opção 1</SelectItem>
          <SelectItem value='op2'>Opção 2</SelectItem>
        </SelectContent>
      </Select>
    )
    screen.debug()
    const trigger = screen.getByTestId('select-trigger')
    expect(trigger).toBeInTheDocument()

    fireEvent.click(trigger)

    const option1 = await screen.findByText('Opção 1')
    const option2 = await screen.findByText('Opção 2')

    expect(option1).toBeInTheDocument()
    expect(option2).toBeInTheDocument()
  })
})
