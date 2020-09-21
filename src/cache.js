import { InMemoryCache } from '@apollo/client'
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isActiveThisShit: Boolean,
        post() {
          return postsItemsVar()
        },
        posts: {
          keyArgs: false,
          merge(existing, incoming) {
            let posts = []
            if (existing && existing.posts) {
              posts = posts.concat(existing.posts)
            }
            if (incoming && incoming.posts) {
              posts = posts.concat(incoming.posts)
            }
            return Object.assign(Object.assign({}, incoming), { posts })
          },
        },
        currentPost: {},
      },
    },
  },
})
export const postsItemsVar = cache.makeVar([])
