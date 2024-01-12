'use client'

import styles from './text_block.module.scss'

import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import Link from 'next/link'
import { ComponentLayoutTextBlock } from '@strapi/graphql-types'
import P from '@components/Typography/Paragraph'
import { H1, H2, H3, H4, Heading } from '@components/Typography/Headings'

const TextBlock = (props: ComponentLayoutTextBlock) => {
  return (
    <div className={styles.text_block}>
      {props.title && <Heading {...props.title} />}

      <BlocksRenderer
        content={props.content}
        blocks={{
          paragraph: ({ children }) => <P>{children}</P>,
          link: ({ children, url }) => <Link href={url}>{children}</Link>,
          heading: ({ children, level }) => {
            switch (level) {
              case 1:
                return <H1>{children}</H1>
              case 2:
                return <H2>{children}</H2>
              case 3:
                return <H3>{children}</H3>
              case 4:
                return <H4>{children}</H4>
            }
          },
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
