import { Card } from '@/components/ui/card'
import { render } from '@testing-library/react'
describe('Card', () => {
  it('should render without crashing', () => {
    render(<Card />)
  })
})
