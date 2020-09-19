import React from 'react'
import logo from './logo.svg'
import './App.scss'
import { useQuery, gql } from '@apollo/client'

function App() {
  const GET_POSTS = gql`
    query($options: PageQueryOptions) {
      posts(options: $options) {
        data {
          id
          title
        }
        meta {
          totalCount
        }
      }
    }
  `

  const options = {
    variables: {
      options: {
        paginate: {
          page: 1,
          limit: 5,
        },
      },
    },
  }

  const { data, loading, error } = useQuery(GET_POSTS, options)

  if (loading) return <h1>LOADING</h1>
  if (error) return <h1>error</h1>
  if (!data) return <h1>not found</h1>

  const {
    posts: { postdata },
  } = data

  console.log(data.posts)

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
      <ul>
        {data.posts.data &&
          data.posts.data.length >= 1 &&
          data.posts.data.map((post) => <li key={post.id}>{post.title}</li>)}
      </ul>
    </div>
  )
}

export default App
