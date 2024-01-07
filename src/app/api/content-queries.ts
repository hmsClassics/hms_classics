import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { Page } from './graphql-types'

const cacheBust = new Date().getSeconds()

const client = new ApolloClient({
  uri: `${process.env.STRAPI_GRAPHQL_ENDPOINT}?cacheBust=${cacheBust}`,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
  },
})

export async function getPage(slug: string): Promise<Page> {
  const { data } = await client.query({
    query: gql`
      query GetPage($slug: String!) {
        pages(filters: { slug: { eq: $slug } }) {
          data {
            attributes {
              slug
              headerType {
                type
                heroTitle
                background {
                  data {
                    attributes {
                      url
                      alternativeText
                      caption
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { slug },
  })

  return data.pages.data[0].attributes
}
