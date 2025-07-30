import { Dialog } from '@/components/ui/dialog'
import { render } from '@testing-library/react'

describe('Dialog', () => {
  it('should render without crashing', () => {
    render(<Dialog />)
  })
})
