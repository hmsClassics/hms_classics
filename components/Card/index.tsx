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
  console.log('Card', { body, button, id, image, title, display_style })
  const cardImageClasses = cx(styles.card__image, {
    [styles['card__image--bottom']]: display_style === 'image_bottom',
    [styles['card__image--top']]: display_style === 'image_top',
  })
  const cardContentClasses = cx(styles.card__content, {
    [styles['card__content--image_bottom']]: display_style === 'image_bottom',
    [styles['card__content--image_top']]: display_style === 'image_top',
  })

  return (
    <div className={styles.card}>
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
