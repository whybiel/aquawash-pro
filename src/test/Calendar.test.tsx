import { Calendar } from '@/components/ui/calendar'
import { render } from '@testing-library/react'

describe('Calendar', () => {
  it('should render without crashing', () => {
    render(<Calendar />)
  })
})
