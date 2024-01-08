import { ApolloClient, InMemoryCache } from '@apollo/client'

// this probably breaks some sweet nextjs stuff
// but small edits in content weren't showing up.
// after dev, we can probably remove this.
const cacheBust = new Date().getSeconds()

export const client = new ApolloClient({
  uri: `${process.env.STRAPI_GRAPHQL_ENDPOINT}?cacheBust=${cacheBust}`,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
  },
})

export default client
