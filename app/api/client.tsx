import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = (cacheBuster: string) =>
  new ApolloClient({
    uri: `${process.env.STRAPI_GRAPHQL_ENDPOINT}?cacheBuster=${cacheBuster}`,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  })

export default client
