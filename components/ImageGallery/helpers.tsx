import { UploadFileEntity } from '@/strapi_api/types'
import Image from 'next/image'
import Link from 'next/link'
import { serializedUploadFileEntity } from '@/utility/component_serializer'

export const LIGHTBOX_SELECTOR = (withClass?: boolean) =>
  withClass ? '.gallery-item' : 'gallery-item'

export const renderThumbnial = (image: UploadFileEntity) => {
  const serializedThumbnailImage = serializedUploadFileEntity({
    image,
    thumbnail: true,
  })
  const serializedOriginalImage = serializedUploadFileEntity({
    image,
  })

  return (
    <Link
      key={`gallery-item-link-${image.id}`}
      href={serializedOriginalImage.url}
      data-lg-size={`${serializedOriginalImage.width}-${serializedOriginalImage.height}`}
      className={LIGHTBOX_SELECTOR()}>
      <Image
        key={`gallery-item-image-${image.id}`}
        src={serializedThumbnailImage.url}
        alt={serializedThumbnailImage.alt_text}
        width={serializedThumbnailImage.width}
        height={serializedThumbnailImage.height}
      />
    </Link>
  )
}
