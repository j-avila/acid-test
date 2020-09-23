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
    const { current } = this.props
    const { title, body } = this.state.postForm
    const newPost = {
      variables: {
        id,
        input: { title: this.state.postForm.title, body: this.state.postForm.body },
      },
    }

    const updatePost = {
      variables: {
        id: current,
        input: {
          title,
          body,
        },
      },
    }

    id ? this.props.editHandler(updatePost) : this.props.action(newPost)
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
    // console.log(this.props.current, this.props.data)

    if (this.props.current !== null && this.props.current !== prevProps.current) {
      const { data } = this.props
      this.props.data.post &&
        this.setState({
          postForm: {
            id: this.props.current,
            title: data.post.title,
            body: data.post.body,
          },
        })
    }

    if (this.props.current === prevProps.current) {
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

    if (prevProps.current && !this.props.current) {
      this.setState({
        postForm: {
          title: 'todo comeinza con un titulo',
          content: 'inserta aqui tu contenido, haz click en el lapiz para comenzar',
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
              placeholder='ingresa el titulo aqui'
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
              placeholder='aqui va el contenido del post'
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
