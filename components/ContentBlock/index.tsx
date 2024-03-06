import cx from 'classnames'
import localFont from 'next/font/local'

import { ComponentLayoutContentBlock } from '@/strapi_api/types'
import Img from '@components/Image'
import styles from './content_block.module.scss'
import TextBlocksRenderer from '@components/TextBlocksRenderer'
import LinkButton from '../LinkButton'

const heveticaNueuCondensedBold = localFont({
  src: '../../fonts/Helvetica-Neue-Condensed-Bold.woff2',
  variable: '--font-helvetica-neue-condensed-bold',
})

export default function ContentBlock({
  main_heading,
  sub_heading,
  content,
  image,
  layout_options: { dynamic_swatch_colors, layout },
  button,
}: ComponentLayoutContentBlock) {
  const contentBlockLayoutClasses = cx(styles.contentBlock, {
    [styles['contentBlock--image-left']]: layout === 'image_left',
    [styles['contentBlock--image-right']]: layout === 'image_right',
  })

  return (
    <section className={contentBlockLayoutClasses}>
      <div className={styles.contentBlock__image}>
        <Img componentMediaImage={image} key={image.id} />
      </div>
      <div className={styles.contentBlock__content}>
        <h2>{main_heading}</h2>
        <h3 className={cx(heveticaNueuCondensedBold.className)}>
          {sub_heading}
        </h3>
        <TextBlocksRenderer content={content} />

        {button && (
          <LinkButton
            id={button.id}
            link_target={button.link_target}
            button_text={button.button_text}
          />
        )}
      </div>
    </section>
  )
}
