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

const IMAGE_ATTRIBUTES = gql`
  fragment imageAttributes on ComponentMediaImage {
    id
    alt_text
    description
    image_alignment
    file {
      ...mediaAttributes
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

const BLOCK_LAYOUT_ATTRIBUTES = gql`
  fragment blockLayoutAttributes on ComponentUtilityLayoutOptions {
    dynamic_swatch_colors
    layout
  }
`

const LAYOUT_FEATURED_BLOCK_ATTRIBUTES = gql`
  fragment layoutFeaturedBlockAttributes on ComponentLayoutFeaturedContentBlock {
    id
    main_heading
    sub_heading
    content
    button {
      button_text
      link_target
    }
    image_1 {
      ...imageAttributes
    }
    image_2 {
      ...imageAttributes
    }
    layout_options {
      ...blockLayoutAttributes
    }
  }
`

const LAYOUT_BLOCK_ATTRIBUTES = gql`
  fragment layoutBlockAttributes on ComponentLayoutContentBlock {
    id
    main_heading
    sub_heading
    content
    button {
      button_text
      link_target
    }
    image {
      ...imageAttributes
    }
    layout_options {
      ...blockLayoutAttributes
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
      ${PAGE_SEO_FRAGMENT}
      ${HEADER}
      ${MEDIA_ATTRIBUTES_FRAGMENT}
      ${IMAGE_ATTRIBUTES}
      ${IMAGE_GRID_ATTRIBUTES}
      ${BLOCK_LAYOUT_ATTRIBUTES}
      ${LAYOUT_BLOCK_ATTRIBUTES}
      ${LAYOUT_FEATURED_BLOCK_ATTRIBUTES}

      query GetPage($slug: String!) {
        pages(filters: { slug: { eq: $slug } }) {
          data {
            attributes {
              slug
              ...header
              ...pageSEO
              content {
                ... on ComponentMediaImage {
                  ...imageAttributes
                }
                ... on ComponentMediaVideo {
                  wistia_oEmbed_url
                }
                ... on ComponentLayoutImageGrid {
                  ...imageGridAttributes
                }
                ... on ComponentLayoutContentBlock {
                  ...layoutBlockAttributes
                }
                ... on ComponentLayoutFeaturedContentBlock {
                  ...layoutFeaturedBlockAttributes
                }
                ... on ComponentLayoutTextBlock {
                  __typename
                  id
                  text_content
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
