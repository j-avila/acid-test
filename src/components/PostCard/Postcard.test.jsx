import React from 'react'
import { render } from '@testing-library/react'
import PostCard from './Postcard'

const dummy = {
  id: 1,
  title: 'titulo de prueba',
  description:
    'In order to use Pro icons, you’ll need to pass the type of icon you want to use into the icon prop of the component read on for more detailed instructions about usage:',
}

test('Postcard souhld render with text', async () => {
  // arrange
  const { getByText } = render(
    <PostCard id={dummy.id} title={dummy.title} desc={dummy.description} />
  )

  // act
  const title = getByText('titulo de prueba')
  const description = getByText(dummy.description)

  // assert
  expect(title).toHaveTextContent(dummy.title)
  expect(description).toHaveTextContent(dummy.description)
})
