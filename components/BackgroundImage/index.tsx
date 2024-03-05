import Image from 'next/image'

import styles from './background_image.module.scss'
import { ComponentMediaImage } from '@strapi/types'
import { ImageSerializer } from '@utility/component_serializer'

export default function BgImg(componentMediaImage: ComponentMediaImage) {
  const serializedImage =
    componentMediaImage &&
    ImageSerializer.serialize({
      image: componentMediaImage,
    })

  return (
    <div className={styles.bg_image__wrapper}>
      {serializedImage?.url && serializedImage?.alt_text && (
        <div
          className={styles.bg_image}
          style={{
            backgroundImage: `url(${serializedImage.url})`,
            aspectRatio: `${serializedImage.width}/${serializedImage.height}`,
          }}>
          {serializedImage.alt_text}
        </div>
      )}
    </div>
  )
}
