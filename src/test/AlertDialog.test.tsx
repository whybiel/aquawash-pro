import { AlertDialog } from '@/components/ui/alert-dialog'
import { render } from '@testing-library/react'

describe('AlertDialog', () => {
  it('should render without crashing', () => {
    render(<AlertDialog />)
  })
})
