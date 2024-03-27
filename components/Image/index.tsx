import Image from 'next/image'

import styles from './image.module.scss'
import { ComponentMediaImage } from '@strapi/types'
import { ImageSerializer } from '@utility/component_serializer'

type ImgProps = {
  componentMediaImage: ComponentMediaImage
  portrait?: boolean
}

export default function Img(props: ImgProps) {
  const { componentMediaImage, portrait } = props
  const image = componentMediaImage || props
  const serializedImage =
    image &&
    ImageSerializer.serialize({
      image,
      portrait,
    })

  return (
    <div className={styles.image__wrapper}>
      {serializedImage?.url && serializedImage?.alt_text && (
        <Image
          src={serializedImage.url}
          alt={serializedImage.alt_text}
          className={styles.image}
          width={serializedImage?.width}
          height={serializedImage?.height}
        />
      )}
    </div>
  )
}
