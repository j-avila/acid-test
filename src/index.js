import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
// import { typeDefs } from './queries/resolvers'
// import { cache } from './cache'

const cache = new InMemoryCache()
const baseURL = process.env.REACT_APP_API_URL

const client = new ApolloClient({
  uri: baseURL,
  cache,
  onError: (e) => {
    console.log(e)
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
