'use client'

import styles from './text_blocks_renderer.module.scss'

import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import Link from 'next/link'
import { ComponentLayoutTextBlock } from '@strapi/types'
import P from '@components/Typography/Paragraph'
import { H1, H2, H3, H4 } from '@components/Typography/Headings'

const TextBlocksRenderer = (props: Partial<ComponentLayoutTextBlock>) => {
  return (
    <div className={styles.text_block}>
      <BlocksRenderer
        content={props.text_content}
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

export default TextBlocksRenderer
