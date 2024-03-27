import { gql } from '@apollo/client'

export type QueryModel = 'Page' | 'Car'

export const HEADER = (model: QueryModel) => gql`
  fragment ${model}header on ${model} {
    headerType {
      type
      heroTitle
      background {
        ...mediaAttributes
      }
    }
  }
`

export const SEO_FRAGMENT = (model: QueryModel) => gql`
fragment ${model}SEO on ${model} {
  seo {
    htmlTitle
    htmlDescription
    socialImage {
      ...mediaAttributes
    }
  }
}
`

export const UPLOAD_FILE = gql`
  fragment uploadFile on UploadFile {
    url
    alternativeText
    caption
    width
    height
    provider_metadata
  }
`

export const MEDIA_ATTRIBUTES_FRAGMENT = gql`
  fragment mediaAttributes on UploadFileEntityResponse {
    data {
      attributes {
        ...uploadFile
      }
    }
  }
`

export const IMAGE_ATTRIBUTES = gql`
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

export const IMAGE_GRID_ATTRIBUTES = gql`
  fragment imageGridAttributes on ComponentLayoutImageGrid {
    gridImages {
      ...imageAttributes
    }
    style
  }
`

export const BLOCK_LAYOUT_ATTRIBUTES = gql`
  fragment blockLayoutAttributes on ComponentUtilityLayoutOptions {
    dynamic_swatch_colors
    layout
  }
`

export const LAYOUT_BLOCK_ATTRIBUTES = gql`
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
