import { Badge } from '@/components/ui/badge'
import { render } from '@testing-library/react'

describe('Badge', () => {
  it('should render without crashing', () => {
    render(<Badge />)
  })
})
