import { Alert } from '@/components/ui/alert'
import { render } from '@testing-library/react'

describe('Alert', () => {
  it('should render without crashing', () => {
    render(<Alert />)
  })
})
