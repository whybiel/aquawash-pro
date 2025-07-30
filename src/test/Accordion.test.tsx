import { render } from '@testing-library/react'
import { Accordion } from '@/components/ui/accordion'

describe('Accordion', () => {
  it('should render without crashing', () => {
    render(
      <Accordion type='single'>
        <div>Accordion Item</div>
      </Accordion>
    )
  })
})
