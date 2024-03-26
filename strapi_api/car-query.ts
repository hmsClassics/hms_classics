import { gql } from '@apollo/client'
import { Car } from '@strapi/types'
import client from '@strapi/client'
import {
  HEADER,
  BLOCK_LAYOUT_ATTRIBUTES,
  IMAGE_ATTRIBUTES,
  MEDIA_ATTRIBUTES_FRAGMENT,
  LAYOUT_BLOCK_ATTRIBUTES,
  UPLOAD_FILE,
  SEO_FRAGMENT,
} from './common-queries'
import type { QueryModel } from './common-queries'

const queryModel: QueryModel = 'Car'

const IMAGE_GALLERY = gql`
  fragment imageGallery on ComponentMediaImageGallery {
    images {
      data {
        id
        attributes {
          ...uploadFile
        }
      }
    }
  }
`

export async function getCar(slug: string): Promise<Car> {
  const cacheBustedClient = client(Date.now().toString())

  const query = {
    query: gql`
      ${UPLOAD_FILE}
      ${MEDIA_ATTRIBUTES_FRAGMENT}
      ${IMAGE_ATTRIBUTES}
      ${HEADER(queryModel)}
      ${SEO_FRAGMENT(queryModel)}
      ${IMAGE_GALLERY}
      ${BLOCK_LAYOUT_ATTRIBUTES}
      ${LAYOUT_BLOCK_ATTRIBUTES}

      query GetCar($slug: String!) {
        cars(filters: { slug: { eq: $slug } }) {
          data {
            attributes {
              slug
              ...${queryModel}SEO
              ...${queryModel}header
              content {
                ... on ComponentMediaImage {
                  ...imageAttributes
                }
                ... on ComponentMediaImageGallery {
                  ...imageGallery
                }
                ... on ComponentLayoutContentBlock {
                  ...layoutBlockAttributes
                }
                ... on ComponentLayoutTextBlock {
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
  }

  const { data } = await cacheBustedClient.query(query)

  return data.cars.data[0].attributes
}
