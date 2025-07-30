import { Textarea } from '@/components/ui/textarea'
import { render } from '@testing-library/react'

describe('Textarea', () => {
  it('should render without crashing', () => {
    render(<Textarea />)
  })
})
