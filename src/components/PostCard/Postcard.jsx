import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './styles.scss'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default class Postcard extends Component {
  static propTypes = {
    prop: PropTypes.object,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    des: PropTypes.string,
  }

  render() {
    const { id, title, desc, editHandler } = this.props
    return (
      <div id='card' data-post={id}>
        <h4>{title}</h4>
        <p>{desc}</p>
        <div className='actions'>
          <button type='button' onClick={() => editHandler(id)}>
            <FontAwesomeIcon icon={faEdit} className='but-edit' size='1x' />
          </button>
          <button type='button'>
            <FontAwesomeIcon icon={faTrashAlt} className='but-delete' size='1x' />
          </button>
        </div>
      </div>
    )
  }
}
