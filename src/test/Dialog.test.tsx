import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

describe('Dialog', () => {
  it('deve renderizar o conteúdo do Dialog quando aberto', () => {
    render(
      <Dialog open>
        <DialogTrigger asChild>
          <Button>Abrir</Button>
        </DialogTrigger>
        <DialogContent>
          <p>Conteúdo do modal</p>
        </DialogContent>
      </Dialog>
    )

    expect(screen.getByText(/conteúdo do modal/i)).toBeInTheDocument()
  })
})
