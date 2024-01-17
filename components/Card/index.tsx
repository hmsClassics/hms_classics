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
}: ComponentLayoutCard) {
  return (
    <div className={styles.card}>
      <div className={styles.card__content}>
        <div className={styles.card__body}>
          {title && <Heading {...title} />}
          <div className={styles.card__text}>{body}</div>
          {button && <LinkButton {...button} />}
        </div>
        <div className={styles.card__image}>
          {image && <Img {...image} key={image.id} />}
        </div>
      </div>
    </div>
  )
}
