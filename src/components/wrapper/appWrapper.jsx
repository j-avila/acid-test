import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation } from '@apollo/client'
import { GET_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST } from '../../queries'
import Sidebar from '../Sidebar/Sidebar'
import PostContent from '../PostContent/PostContent'
import './styles.scss'
import Loader from '../Loader/Loader'

export const options = {
  variables: {
    options: {
      paginate: {
        page: 1,
        limit: 5,
      },
    },
  },
}

//  el unico componente con hooks debido a que la nueva api  de apollo cliente recomeinda el uso de los mismos con apollo client 3.0
// el resto  de los componetes son componentes clases xon un rwraper de apollo client pero ellos advierten que este se encuentra deprecado desde marzo del  2020

const AppWrapper = () => {
  // local state
  const [currentPost, setcurrentPost] = useState(null)
  const [todelete, setToDelete] = useState(null)

  // queries
  const { data, loading, error } = useQuery(GET_POSTS, options)

  // mutations
  const [createPost] = useMutation(CREATE_POST, {
    update(cache, { data }) {
      const newPostFromResponse = data?.createPost
      let existingPosts = cache.readQuery({
        query: GET_POSTS,
        ...options,
      })

      cache.writeQuery({
        query: GET_POSTS,
        ...options,
        data: {
          posts: {
            __typename: 'PostsPage',
            data: existingPosts?.posts.data.concat(newPostFromResponse),
            meta: existingPosts.posts.meta,
          },
        },
      })
      // console.log('new order', existingPosts.posts.meta)
      alert('post creado con exito')
    },
  })

  const [updatePost] = useMutation(UPDATE_POST)

  const [deletePost] = useMutation(DELETE_POST, {
    update(cache, { data }) {
      // console.log(cache)
      data.deletePost && alert('Post Eliminado con exito')
      const postToRemove = todelete.variables.id
      let existingPosts = cache.readQuery({
        query: GET_POSTS,
        ...options,
      })

      cache.writeQuery({
        query: GET_POSTS,
        ...options,
        data: {
          posts: {
            __typename: 'PostsPage',
            data: existingPosts?.posts.data.filter((p) => p.id != postToRemove),
            meta: existingPosts.posts.meta,
          },
        },
      })

      let newOrder = cache.readQuery({
        query: GET_POSTS,
        ...options,
      })

      console.log('to remove', postToRemove)

      console.log('new order is', newOrder)
    },
  })

  const handleDelete = async (id) => {
    console.log(id)
    await setToDelete(id)
    deletePost(id)
  }

  if (loading) return <Loader />
  if (error) return <h1>error</h1>
  if (!data) return <h1>not found</h1>

  return (
    <div id='wrap'>
      <Sidebar
        posts={data.posts.data}
        handlePost={setcurrentPost}
        deleteHanlder={handleDelete}
      />
      <PostContent action={createPost} current={currentPost} editHandler={updatePost} />
    </div>
  )
}

AppWrapper.propTypes = {
  prop: PropTypes.object,
}

export default AppWrapper
