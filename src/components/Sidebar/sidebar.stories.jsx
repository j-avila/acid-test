import React from 'react'

import Sidebar from './Sidebar'

export default {
  title: 'sidebar',
  component: Sidebar,
}

const dummy = [
  {
    id: 1,
    title: 'titulo cualquiera',
    description:
      'cualquier descripción que valga la pena que tenga un monton de lineas solo para hacer bulto',
  },
  {
    id: 2,
    title: 'titulo cualquiera 2',
    description:
      'cualquier descripción que valga la pena que tenga un monton de lineas solo para hacer bulto2',
  },
  {
    id: 3,
    title: 'titulo cualquiera 2',
    description:
      'cualquier descripción que valga la pena que tenga un monton de lineas solo para hacer bulto2',
  },
  {
    id: 4,
    title: 'titulo cualquiera 2',
    description:
      'cualquier descripción que valga la pena que tenga un monton de lineas solo para hacer bulto2',
  },
  {
    id: 4,
    title: 'titulo cualquiera 2',
    description:
      'cualquier descripción que valga la pena que tenga un monton de lineas solo para hacer bulto2',
  },
  {
    id: 5,
    title: 'titulo cualquiera 2',
    description:
      'cualquier descripción que valga la pena que tenga un monton de lineas solo para hacer bulto2',
  },
  {
    id: 6,
    title: 'titulo cualquiera 2',
    description:
      'cualquier descripción que valga la pena que tenga un monton de lineas solo para hacer bulto2',
  },
]

export const sidebarExample = () => <Sidebar posts={dummy} />
export const sidebarEmptyExample = () => <Sidebar />
