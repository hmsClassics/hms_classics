import { gql } from '@apollo/client'
import { Car } from '@strapi/types'
import client from '@strapi/client'

const UPLOAD_FILE = gql`
  fragment uploadFile on UploadFile {
    url
    alternativeText
    caption
    width
    height
    provider_metadata
  }
`

const MEDIA_ATTRIBUTES_FRAGMENT = gql`
  fragment mediaAttributes on UploadFileEntityResponse {
    data {
      attributes {
        ...uploadFile
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

const HEADER = gql`
  fragment header on Car {
    headerType {
      type
      heroTitle
      background {
        ...mediaAttributes
      }
    }
  }
`

const CAR_SEO_FRAGMENT = gql`
  fragment carSEO on Car {
    seo {
      htmlTitle
      htmlDescription
      socialImage {
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
      ${HEADER}
      ${CAR_SEO_FRAGMENT}
      ${IMAGE_GALLERY}
      ${BLOCK_LAYOUT_ATTRIBUTES}
      ${LAYOUT_BLOCK_ATTRIBUTES}

      query GetCar($slug: String!) {
        cars(filters: { slug: { eq: $slug } }) {
          data {
            attributes {
              slug
              ...carSEO
              ...header
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
