import React from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation } from '@apollo/client'
import { GET_POSTS, CREATE_POST } from '../../queries'
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
  const { data, loading, error } = useQuery(GET_POSTS, options)
  const [createPost] = useMutation(CREATE_POST, {
    update(cache, { data }) {
      const newPostFromResponse = data?.createPost
      let existingPosts = {}

      try {
        existingPosts = cache.readQuery({
          query: GET_POSTS,
          options,
        })
      } catch (error) {
        console.log(error)
      }

      console.log(existingPosts)
      /* cache.writeQuery({
        query: GET_POSTS,
        data: {
          posts: existingPosts?.post.concat(newPostFromResponse),
        },
      }) */
    },
  })

  if (loading) return <Loader />
  if (error) return <h1>error</h1>
  if (!data) return <h1>not found</h1>

  console.log(data)

  return (
    <div id='wrap'>
      <Sidebar posts={data.posts.data} />
      <PostContent action={createPost} />
    </div>
  )
}

AppWrapper.propTypes = {
  prop: PropTypes.object,
}

export default AppWrapper
