import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { Page } from './graphql-types'

// this probably breaks some sweet nextjs stuff
// but small edits in content weren't showing up.
// after dev, we can probably remove this.
const cacheBust = new Date().getSeconds()

const client = new ApolloClient({
  uri: `${process.env.STRAPI_GRAPHQL_ENDPOINT}?cacheBust=${cacheBust}`,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
  },
})

const UPLOAD_FILE_ENTITY_RESPONSE_FRAGMENT = gql`
  fragment MediaAttributes on UploadFileEntityResponse {
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
`

export async function getPage(slug: string): Promise<Page> {
  const { data } = await client.query({
    query: gql`
      fragment MediaAttributes on UploadFileEntityResponse {
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

      query GetPage($slug: String!) {
        pages(filters: { slug: { eq: $slug } }) {
          data {
            attributes {
              slug
              headerType {
                type
                heroTitle
                background {
                  ...MediaAttributes
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
