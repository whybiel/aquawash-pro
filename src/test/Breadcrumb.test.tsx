import { Breadcrumb } from '@/components/ui/breadcrumb'
import { render } from '@testing-library/react'

describe('Breadcrumb', () => {
  it('should render without crashing', () => {
    render(<Breadcrumb />)
  })
})
