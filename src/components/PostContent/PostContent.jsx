import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons'
import './styles.scss'

export default class PostContent extends Component {
  static propTypes = {
    prop: PropTypes.object,
  }

  constructor() {
    super()
    this.state = {
      editable: '',
      postForm: {
        title: '',
        content: '',
      },
      initialData: {},
    }
  }

  handleEditFields = (field) => {
    if (field === this.state.editable) {
      this.setState({ editable: '' })
    } else {
      this.setState({ editable: field })
    }
  }

  escFunction = (event) => {
    if (event.keyCode === 27) {
      this.setState({ editable: '', postForm: { ...this.state.initialData } })
    }
  }

  handleInput = (field, event) => {
    const value = event.target.value

    this.setState(
      {
        postForm: {
          ...this.state.postForm,
          [field]: value,
        },
      }
      // console.log(this.state.postForm)
    )
  }

  componentDidMount(prevProps) {
    if (this.props.posts) {
      const { title, content } = this.props.posts
      this.setState({
        postForm: {
          title,
          content,
        },
        initialData: {
          title,
          content,
        },
      })
    } else {
      this.setState({
        postForm: {
          title: 'todo comeinza con un titulo',
          content: 'inserta aqui tu contenido, haz click en el lapiz para comenzar',
        },
        initialData: {
          title: 'todo comeinza con un titulo',
          content: 'inserta aqui tu contenido, haz click en el lapiz para comenzar',
        },
      })
    }
    document.addEventListener('keydown', this.escFunction, false)
  }

  render() {
    const { postForm, editable } = this.state
    return (
      <div id='postContent'>
        <header>
          <FontAwesomeIcon
            icon={this.state.editable === 'title' ? faSave : faPencilAlt}
            size='1x'
            onClick={() => this.handleEditFields('title')}
          />
          {editable === 'title' ? (
            <input
              type='text'
              defaultValue={postForm.title}
              onChange={(e) => this.handleInput('title', e)}
            />
          ) : (
            <h1>{postForm.title}</h1>
          )}
        </header>
        <article>
          <FontAwesomeIcon
            icon={this.state.editable === 'content' ? faSave : faPencilAlt}
            size='1x'
            onClick={() => this.handleEditFields('content')}
          />
          {editable === 'content' ? (
            <textarea
              rows='10'
              cols='50'
              defaultValue={postForm.content}
              onChange={(e) => this.handleInput('content', e)}
            ></textarea>
          ) : (
            <p>{postForm.content}</p>
          )}
        </article>
      </div>
    )
  }
}
