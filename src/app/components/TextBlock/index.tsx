'use client'

import styles from './text_block.module.scss'

import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import Link from 'next/link'
import { ComponentLayoutTextBlock } from '../../api/graphql-types'
import P from '../Typography/Paragraph'
import { Heading } from '../Typography/Headings'

const TextBlock = (props: ComponentLayoutTextBlock) => {
  return (
    <div className={styles.text_block}>
      {props.title && <Heading {...props.title} />}

      <BlocksRenderer
        content={props.content}
        blocks={{
          paragraph: ({ children }) => <P>{children}</P>,
          link: ({ children, url }) => <Link href={url}>{children}</Link>,
        }}
        modifiers={{
          bold: ({ children }) => <strong>{children}</strong>,
          italic: ({ children }) => <em>{children}</em>,
        }}
      />
    </div>
  )
}

export default TextBlock
