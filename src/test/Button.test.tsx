import { Button } from '@/components/ui/button'
import { render } from '@testing-library/react'

describe('Button', () => {
  it('should render without crashing', () => {
    render(<Button />)
  })
})
