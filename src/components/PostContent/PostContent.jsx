import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons'
import { graphql } from '@apollo/react-hoc'
import './styles.scss'
import Loader from '../Loader/Loader'
import { GET_POST } from '../../queries'

export class PostContent extends Component {
  static propTypes = {
    prop: PropTypes.object,
  }

  constructor() {
    super()
    this.state = {
      editable: '',
      postForm: {
        title: '',
        body: '',
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

  editPost = (id) => {
    const data = {
      variables: {
        input: { title: this.state.postForm.title, body: this.state.postForm.body },
      },
    }
    id ? this.props.editHandler(id, data) : this.props.action(data)
  }

  componentDidMount(prevProps) {
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
    document.addEventListener('keydown', this.escFunction, false)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.current == prevProps.current) {
      console.log(this.props.data.post)
      const { data } = this.props
      this.props.data.post != prevProps.data.post &&
        this.setState({
          postForm: {
            id: this.props.current,
            title: data.post.title,
            body: data.post.body,
          },
        })
    }
  }

  render() {
    const { postForm, editable } = this.state
    const { data, loading, error, current } = this.props
    // console.log(this.props)

    if (loading) {
      return <Loader />
    }
    if (error) {
      return <h1>epa, algo salio mal!</h1>
    }

    return (
      <div id='postContent'>
        <header>
          <FontAwesomeIcon
            icon={editable === 'title' ? faSave : faPencilAlt}
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
              defaultValue={postForm.body}
              onChange={(e) => this.handleInput('body', e)}
            ></textarea>
          ) : (
            <p>{postForm.body}</p>
          )}
        </article>
        <button onClick={() => this.editPost(current)}>
          {`guardar - ${current ? `${current}` : 'nope'}`}
        </button>
      </div>
    )
  }
}

export default graphql(GET_POST, {
  options: ({ current }) => ({ variables: { id: current } }),
})(PostContent)
