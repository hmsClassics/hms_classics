import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { PageEntity } from './graphql-types'

const cacheBust = new Date().getMinutes()

const client = new ApolloClient({
  uri: `${process.env.STRAPI_GRAPHQL_ENDPOINT}?cacheBust=${cacheBust}`,
  cache: new InMemoryCache(),
})

export async function getPage(slug: string): Promise<PageEntity> {
  console.log('getPage', slug)
  const { data } = await client.query({
    query: gql`
      fragment mediaAttributes on UploadFileEntityResponse {
        data {
          attributes {
            url
            alternativeText
            caption
            width
            height
            provider_metadata
          }
        }
      }

      fragment imageAttributes on ComponentMediaImage {
        id
        alt_text
        description
        file {
          ...mediaAttributes
        }
      }

      fragment videoAttributes on ComponentMediaVideo {
        id
        description
        video_file {
          ...mediaAttributes
        }
      }

      fragment pageSEO on PageEntity {
        seo {
          htmlTitle
          htmlDescription
          socialImage {
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

      fragment headingAttributes on ComponentLayoutHeading {
        text
        level
      }

      fragment headerType on PageEntity {
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

      query GetPage($slug: String!) {
        pages(filters: { slug: { eq: $slug } }) {
          data {
            attributes {
              pageContent {
                __typename
                ... on ComponentLayoutTextBlock {
                  title {
                    ...headingAttributes
                  }
                  content {
                    text
                  }
                }
                ... on ComponentLayoutHeading {
                  ...headingAttributes
                }
                ... on ComponentMediaImage {
                  ...imageAttributes
                }
                ... on ComponentMediaVideo {
                  ...videoAttributes
                }
              }
              slug
              ...headerType
              ...pageSEO
            }
          }
        }
      }
    `,
    variables: { slug },
  })

  return data.pages.data[0]
}
