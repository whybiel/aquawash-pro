import { Input } from '@/components/ui/input'
import { render } from '@testing-library/react'

describe('Input', () => {
  it('should render without crashing', () => {
    render(<Input />)
  })
})
