import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation } from '@apollo/client'
import { GET_POSTS, CREATE_POST, GET_POST } from '../../queries'
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

const AppWrapper = () => {
  // local state
  const [currentPost, setcurrentPost] = useState(null)

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
      console.log('new order', existingPosts.posts.meta)
    },
  })

  if (loading) return <Loader />
  if (error) return <h1>error</h1>
  if (!data) return <h1>not found</h1>

  return (
    <div id='wrap'>
      <Sidebar posts={data.posts.data} handlePost={setcurrentPost} />
      <PostContent action={createPost} current={currentPost} />
    </div>
  )
}

AppWrapper.propTypes = {
  prop: PropTypes.object,
}

export default AppWrapper
