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
  display_style,
}: ComponentLayoutCard) {
  const cardClasses = cx(styles.card, {
    [styles['card--image-bottom']]: display_style === 'image_bottom',
    [styles['card--image-top']]: display_style === 'image_top',
    [styles['card--image-left']]: display_style === 'image_left',
    [styles['card--image-right']]: display_style === 'image_right',
    [styles['card--full']]: display_style === 'image_full',
  })
  const cardImageClasses = cx(styles.card__image, {
    [styles['card__image--bottom']]: display_style === 'image_bottom',
    [styles['card__image--top']]: display_style === 'image_top',
    [styles['card__image--left']]: display_style === 'image_left',
    [styles['card__image--right']]: display_style === 'image_right',
  })
  const cardContentClasses = cx(styles.card__content, {
    [styles['card__content--image-bottom']]: display_style === 'image_bottom',
    [styles['card__content--image-top']]: display_style === 'image_top',
    [styles['card__content--image-right']]: display_style === 'image_right',
    [styles['card__content--image-left']]: display_style === 'image_left',
  })

  return (
    <div className={cardClasses}>
      <div className={cardContentClasses}>
        <div className={styles.card__body}>
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
