import { gql } from '@apollo/client'
import { Page } from '@strapi/types'
import client from '@strapi/client'

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

const CARD_ATTRIBUTES = gql`
  fragment cardAttributes on ComponentLayoutCard {
    body
    button {
      button_text
      link_target
    }
    id
    image {
      ...imageAttributes
    }
    title {
      ...headingAttributes
    }
    style
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
  const cacheBustedClient = client(Date.now().toString())

  const { data } = await cacheBustedClient.query({
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
                ... on ComponentMediaVideo {
                  wistia_oEmbed_url
                }
                ... on ComponentLayoutImageGrid {
                  ...imageGridAttributes
                }
                ... on ComponentLayoutCard {
                  body
                  id
                  display_style
                  title {
                    ...headingAttributes
                  }
                  image {
                    ...imageAttributes
                  }
                  button {
                    button_text
                    link_target
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { slug },
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  })

  return data.pages.data[0].attributes
}
