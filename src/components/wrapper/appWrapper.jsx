import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../../queries'
import Sidebar from '../Sidebar/Sidebar'
import PostContent from '../PostContent/PostContent'
import './styles.scss'

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

  if (loading) return <h1>LOADING</h1>
  if (error) return <h1>error</h1>
  if (!data) return <h1>not found</h1>

  console.log(data.posts)

  return (
    <div id='wrap'>
      <Sidebar posts={data.posts.data} />
      <PostContent />
    </div>
  )
}

AppWrapper.propTypes = {
  prop: PropTypes.object,
}

export default AppWrapper
