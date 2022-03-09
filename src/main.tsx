import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const uri = import.meta.env.VITE_API_URI;
const cache = new InMemoryCache();

const client = new ApolloClient({
    uri,
    cache,
    connectToDevTools: true
});


ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={client} >
          <App />
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
