import React from 'react'
import { render, screen } from '@testing-library/react'
import SearchBar from './SearchBar'

test('Postcard souhld render with text', async () => {
  // arrange
  render(<SearchBar />)

  // act
  document.getElementById('searchInput').value = 'ejemplo'
  const searchQuery = screen.getByDisplayValue('ejemplo')

  // assert
  expect(searchQuery.value).toEqual('ejemplo')
})
