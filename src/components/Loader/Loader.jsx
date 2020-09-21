import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import './styles.scss'

export default function Loader() {
  return (
    <div id='loader'>
      <FontAwesomeIcon icon={faCircleNotch} size='3x' spin />
      <p>cargando...</p>
    </div>
  )
}
