import { act, fireEvent, render } from '@testing-library/react'
import Search from '../../app/search/index'

describe('Search', () => {
  it('should render the search input', () => {
    const { getByTestId } = render(<Search />)
    
    expect(
      getByTestId('input').nodeName
    ).toBe('INPUT')
  })

  it('should have the submit button disabled', () => {
    const { getByTestId } = render(<Search />)

    expect(
      getByTestId('submit-button').ariaDisabled
    ).toBe('true')
  })

  it('should search cache for matches on change', () => {
    const { getByTestId } = render(<Search />)
    const searchInput = getByTestId('input')

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'US' } })
    })

    expect(
      getByTestId('suggestion-list').children.length
    ).toBe(0)

    expect(
      getByTestId('submit-button').ariaDisabled
    ).toBe('false')
  })
})
