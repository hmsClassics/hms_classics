import Image from 'next/image'

import styles from './image.module.scss'
import { ComponentMediaImage } from '@strapi/types'
import { serializedUploadFileEntity } from '@utility/component_serializer'

type ImgProps =
  | {
      componentMediaImage: ComponentMediaImage
      portrait?: boolean
    }
  | ComponentMediaImage

export default function Img(props: ImgProps) {
  const image =
    'componentMediaImage' in props
      ? props.componentMediaImage.file?.data
      : props.file?.data
  const portrait = 'componentMediaImage' in props ? props.portrait : false
  const serializedImage = serializedUploadFileEntity({
    image,
    portrait,
  })

  return (
    <div className={styles.image__wrapper}>
      {serializedImage?.url && (
        <Image
          src={serializedImage.url}
          alt={serializedImage.alt_text || 'Image Description'}
          className={styles.image}
          width={serializedImage?.width}
          height={serializedImage?.height}
        />
      )}
    </div>
  )
}
