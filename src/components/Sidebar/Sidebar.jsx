import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchBar from '../Searchbar/SearchBar'
import PostCard from '../PostCard/Postcard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSmileBeam } from '@fortawesome/free-solid-svg-icons'
import './styles.scss'

export default class Sidebar extends Component {
  static propTypes = {
    prop: PropTypes.object,
  }

  render() {
    const { posts } = this.props
    return (
      <aside>
        <img id='logo' src={require('../../assets/img/logo.svg')} alt='acid lab test' />
        <SearchBar />
        <section>
          {posts && posts.length >= 1 ? (
            posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                desc={post.description}
              />
            ))
          ) : (
            <h1>
              <FontAwesomeIcon icon={faSmileBeam} size='2x' />
              nothing here
            </h1>
          )}
        </section>
        <button tyoe='button' className='but-add'>
          <FontAwesomeIcon icon={faPlus} size='2x' />
        </button>
      </aside>
    )
  }
}
