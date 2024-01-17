import { gql } from '@apollo/client'
import { FooterNavigation, PrimaryNavigation } from '@strapi/types'
import client from '@strapi/client'

const LINK_ATTRIBUTES = gql`
  fragment linkAttributes on ComponentLayoutLink {
    id
    linkText
    title
    url
  }
`

export async function getPrimaryNavigation(): Promise<PrimaryNavigation> {
  const cacheBustedClient = client(Date.now().toString())
  const { data } = await cacheBustedClient.query({
    query: gql`
      ${LINK_ATTRIBUTES}

      query GetPrimaryNavigation {
        primaryNavigation {
          data {
            id
            attributes {
              createdAt
              links {
                ...linkAttributes
              }
            }
          }
        }
      }
    `,
  })

  return data.primaryNavigation.data.attributes
}

export async function getFooterNavigation(): Promise<FooterNavigation> {
  const cacheBustedClient = client(Date.now().toString())
  const { data } = await cacheBustedClient.query({
    query: gql`
      ${LINK_ATTRIBUTES}

      query FooterNavigation {
        footerNavigation {
          data {
            id
            attributes {
              createdAt
              links {
                ...linkAttributes
              }
            }
          }
        }
      }
    `,
  })

  return data.footerNavigation.data.attributes
}
