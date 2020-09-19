import React from 'react'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import App, { GET_POSTS, options } from './App'

const postmocks = {
  request: {
    query: GET_POSTS,
    varialbles: {
      options: options,
    },
  },
  result: {
    data: {
      posts: {
        data: [
          {
            id: '1',
            title:
              'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
          },
          {
            id: '2',
            title: 'qui est esse',
          },
          {
            id: '3',
            title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
          },
          {
            id: '4',
            title: 'eum et est occaecati',
          },
          {
            id: '5',
            title: 'nesciunt quas odio',
          },
        ],
        meta: {
          totalCount: 100,
        },
      },
    },
  },
}

xtest('renders learn react link', async () => {
  // arrage
  render(
    <MockedProvider mocks={[postmocks]} addTypename={false}>
      <App />
    </MockedProvider>
  )
  // act
  await new Promise((resolve) => setTimeout(resolve, 0), 3000)

  const element = screen.getByTestId('app-wrapper')
  // assert
  expect(element).toMatchSnapshot()
})
