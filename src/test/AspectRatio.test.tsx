import { AspectRatio } from '@/components/ui/aspect-ratio'
import { render } from '@testing-library/react'

describe('AspectRatio', () => {
  it('should render without crashing', () => {
    render(<AspectRatio />)
  })
})
