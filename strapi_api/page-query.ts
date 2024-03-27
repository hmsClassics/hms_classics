import { gql } from '@apollo/client'
import { Page } from '@strapi/types'
import client from '@strapi/client'
import {
  HEADER,
  BLOCK_LAYOUT_ATTRIBUTES,
  IMAGE_ATTRIBUTES,
  MEDIA_ATTRIBUTES_FRAGMENT,
  IMAGE_GRID_ATTRIBUTES,
  UPLOAD_FILE,
  LAYOUT_BLOCK_ATTRIBUTES,
  SEO_FRAGMENT,
} from './common-queries'
import type { QueryModel } from './common-queries'

const queryModel: QueryModel = 'Page'

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

export async function getPage(slug: string): Promise<Page> {
  const cacheBustedClient = client(Date.now().toString())

  const { data } = await cacheBustedClient.query({
    query: gql`
      ${UPLOAD_FILE}
      ${HEADER(queryModel)}
      ${SEO_FRAGMENT(queryModel)}
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
              ...${queryModel}header
              ...${queryModel}SEO
              content {
                ... on ComponentMediaImage {
                  ...imageAttributes
                }
                ... on ComponentMediaVideo {
                  wistia_oEmbed_url
                  orientation
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
