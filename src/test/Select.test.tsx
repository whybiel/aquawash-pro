import { Select } from '@/components/ui/select'
import { render } from '@testing-library/react'

describe('Select', () => {
  it('should render without crashing', () => {
    render(<Select />)
  })
})
