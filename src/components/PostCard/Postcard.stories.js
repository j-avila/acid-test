import React from 'react'

import Postcard from './Postcard'

const dummy = {
  id: 1,
  title: 'titulo deprueba',
  description:
    'In order to use Pro icons, you’ll need to pass the type of icon you want to use into the icon prop of the component read on for more detailed instructions about usage:',
}

export default {
  title: 'card post',
  component: Postcard,
}

export const postCardExample = () => (
  <Postcard id={dummy.id} title={dummy.title} desc={dummy.description} />
)
