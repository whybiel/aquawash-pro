import { Avatar } from '@/components/ui/avatar'
import { render } from '@testing-library/react'

describe('Avatar', () => {
  it('should render without crashing', () => {
    render(<Avatar />)
  })
})
