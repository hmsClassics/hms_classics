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

const MEDIA_ATTRIBUTES_FRAGMENT = gql`
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
`

const IMAGE_GRID_ATTRIBUTES = gql`
  fragment imageGridAttributes on ComponentLayoutImageGrid {
    images {
      ...imageAttributes
    }
    style
  }
`

const IMAGE_ATTRIBUTES = gql`
  fragment imageAttributes on ComponentMediaImage {
    id
    alt_text
    description
    file {
      ...mediaAttributes
    }
  }
`

const TEXT_BLOCK_ATTRIBUTES = gql`
  fragment textBlockAttributes on ComponentLayoutTextBlock {
    title {
      ...headingAttributes
    }
    content
  }
`

const HEADING_ATTRIBUTES = gql`
  fragment headingAttributes on ComponentLayoutHeading {
    text
    level
  }
`

const HEADER = gql`
  fragment header on Page {
    headerType {
      type
      heroTitle
      background {
        ...mediaAttributes
      }
    }
  }
`

const PAGE_SEO_FRAGMENT = gql`
  fragment pageSEO on Page {
    seo {
      htmlTitle
      htmlDescription
      socialImage {
        ...mediaAttributes
      }
    }
  }
`

export async function getPage(slug: string): Promise<Page> {
  const { data } = await client.query({
    query: gql`
      ${MEDIA_ATTRIBUTES_FRAGMENT}
      ${HEADING_ATTRIBUTES}
      ${HEADER}
      ${PAGE_SEO_FRAGMENT}
      ${TEXT_BLOCK_ATTRIBUTES}
      ${IMAGE_ATTRIBUTES}
      ${IMAGE_GRID_ATTRIBUTES}

      query GetPage($slug: String!) {
        pages(filters: { slug: { eq: $slug } }) {
          data {
            attributes {
              slug
              ...header
              ...pageSEO
              content {
                ... on ComponentLayoutTextBlock {
                  ...textBlockAttributes
                }
                ... on ComponentMediaImage {
                  ...imageAttributes
                }
                ... on ComponentLayoutImageGrid {
                  ...imageGridAttributes
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
