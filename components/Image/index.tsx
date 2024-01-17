import Image from 'next/image'

import styles from './image.module.scss'
import { ComponentMediaImage } from '@strapi/types'
import { ImageSerializer } from '@utility/component_serializer'

export default function Img(componentMediaImage: ComponentMediaImage) {
  const serializedImage =
    componentMediaImage && ImageSerializer.serialize(componentMediaImage)

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
