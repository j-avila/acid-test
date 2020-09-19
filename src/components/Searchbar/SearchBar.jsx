import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './styles.scss'

export default class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      searchQuery: '',
    }
  }

  static propTypes = {
    prop: PropTypes.object,
  }

  render() {
    return (
      <div id='searchbar'>
        <FontAwesomeIcon icon={faSearch} />
        <input
          id='searchInput'
          type='text'
          onChange={(e) => {
            this.setState(
              { searchQuery: e.target.value },
              console.log(this.state.searchQuery)
            )
          }}
        />
      </div>
    )
  }
}
