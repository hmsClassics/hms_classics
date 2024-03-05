import cx from 'classnames'
import localFont from 'next/font/local'

import { ComponentLayoutFeaturedContentBlock } from '@/strapi_api/types'
import Img from '@components/Image'
import styles from './featured_content_block.module.scss'
import TextBlocksRenderer from '@components/TextBlocksRenderer'
import LinkButton from '../LinkButton'

const heveticaNueuCondensedBold = localFont({
  src: '../../fonts/Helvetica-Neue-Condensed-Bold.woff2',
  variable: '--font-helvetica-neue-condensed-bold',
})

export default function FeaturedContentBlock({
  main_heading,
  sub_heading,
  content,
  image_1,
  image_2,
  layout_options,
  button,
}: ComponentLayoutFeaturedContentBlock) {
  const { dynamic_swatch_colors, layout } = layout_options
  const contentBlockLayoutClasses = cx(styles.contentBlock, {
    [styles['contentBlock--image-left']]: layout === 'image_left',
    [styles['contentBlock--image-right']]: layout === 'image_right',
  })

  return (
    <section className={contentBlockLayoutClasses}>
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

      <div
        className={cx(
          styles.contentBlock__image_one,
          styles.contentBlock__image
        )}>
        <Img componentMediaImage={image_1} portrait={true} key={image_1.id} />
      </div>
      <div
        className={cx(
          styles.contentBlock__image_two,
          styles.contentBlock__image
        )}>
        <Img componentMediaImage={image_2} portrait={true} key={image_2.id} />
      </div>
    </section>
  )
}
