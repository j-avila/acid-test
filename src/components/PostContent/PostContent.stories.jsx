import React from 'react'

import PostContent from './PostContent'

const dummy = {
  title: 'ejemplo',
  content:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam fugiat officia facilis, ad quasi sunt excepturi facere repudiandae, possimus accusantium tempore aliquid, provident obcaecati animi quam omnis amet adipisci reiciendis',
}

export default {
  title: 'post content',
  component: PostContent,
}

export const PostExample = () => <PostContent posts={dummy} />
export const PostEmptyExample = () => <PostContent />
