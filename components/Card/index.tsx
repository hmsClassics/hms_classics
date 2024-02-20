import cx from 'classnames'

import { ComponentLayoutCard } from '@strapi/types'
import styles from './card.module.scss'
import { Heading } from '@components/Typography/Headings'
import Img from '@components/Image'
import LinkButton from '../LinkButton'

export default function Card({
  body,
  button,
  id,
  image,
  title,
  image_focus_style,
  layout_variant,
  dynamic_swatch_color,
}: ComponentLayoutCard) {
  const cardClasses = cx(styles.card, {
    [styles['card--image-left']]: layout_variant === 'image_left',
    [styles['card--image-right']]: layout_variant === 'image_right',
  })
  const cardImageClasses = cx(styles.card__image, {
    [styles['card__image--bottom']]: image_focus_style === 'bottom',
    [styles['card__image--top']]: image_focus_style === 'top',
    [styles['card__image--left']]: image_focus_style === 'left',
    [styles['card__image--right']]: image_focus_style === 'right',
  })

  return (
    <div className={cardClasses}>
      <div className={styles.card__content}>
        <div className={styles.card__title}>
          {title && (
            <Heading text={title.text} level={title.level} id={title.id} />
          )}
          <div className={styles.card__text}>{body}</div>
          {button && <LinkButton {...button} />}
        </div>
      </div>
      <div className={cardImageClasses}>
        {image && <Img {...image} key={image.id} />}
      </div>
    </div>
  )
}
