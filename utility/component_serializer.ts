import { Cloudinary } from '@cloudinary/url-gen'
import { fill } from '@cloudinary/url-gen/actions/resize'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'

import {
  ComponentMediaImage,
  Maybe,
  Scalars,
  UploadFileEntity,
} from '@strapi/types'
import { Delivery } from '@cloudinary/url-gen/actions/delivery'

export const THUMB_WIDTH = 300
export const THUMB_HEIGHT = 300

export interface ImageSerializerResponse {
  url: string
  alt_text: string
  caption?: string
  width: number
  height: number
  provider_metadata: Maybe<Scalars['JSON']['output']>
}

function cloudinary() {
  return new Cloudinary({
    cloud: {
      cloudName: process.env.CLOUDINARY_NAME,
    },
    url: {
      secure: true,
    },
  })
}

type ProcessImageProps = {
  provider_metadata: any
  portrait?: boolean
  hero?: boolean
  thumbnail?: boolean
  width?: number | null
  height?: number | null
}

function processedImageURL({
  provider_metadata,
  portrait,
  hero,
  thumbnail,
  width,
  height,
}: ProcessImageProps): string {
  const cld = cloudinary()
  const cloudImage = cld.image(provider_metadata.public_id)
  cloudImage.delivery(Delivery.format('auto'))
  let aspectRatio = 0

  if (width && height) {
    aspectRatio = width / height
    portrait = !portrait && aspectRatio < 1
  }

  if (thumbnail) {
    cloudImage.resize(
      fill().width(THUMB_WIDTH).height(THUMB_HEIGHT).gravity(autoGravity())
    )
  } else if (hero) {
    cloudImage.resize(fill().width(1920).height(1080).gravity(autoGravity()))
  } else if (portrait) {
    cloudImage.resize(fill().width(800).height(1080).gravity(autoGravity()))
  } else {
    cloudImage.resize(fill().height(1080).width(1600).gravity(autoGravity()))
  }

  return cloudImage.toURL()
}

type SerializedUploadFileEntityProps = {
  image: Maybe<UploadFileEntity> | undefined
  portrait?: boolean
  hero?: boolean
  thumbnail?: boolean
}

export function serializedUploadFileEntity({
  image,
  portrait,
  hero,
  thumbnail,
}: SerializedUploadFileEntityProps): ImageSerializerResponse {
  const file_attributes = image?.attributes
  const provider_metadata = file_attributes?.provider_metadata

  let imageURL: string

  if (provider_metadata) {
    imageURL = provider_metadata
      ? processedImageURL({
          provider_metadata,
          portrait,
          hero,
          thumbnail,
          width: file_attributes?.width,
          height: file_attributes?.height,
        })
      : file_attributes?.url ?? ''
  } else {
    imageURL = file_attributes?.url ?? ''
  }

  return {
    url: imageURL,
    alt_text: file_attributes?.alternativeText ?? '',
    caption: file_attributes?.caption ?? '',
    width: thumbnail ? THUMB_WIDTH : file_attributes?.width ?? 0,
    height: thumbnail ? THUMB_HEIGHT : file_attributes?.height ?? 0,
    provider_metadata,
  }
}

export function serializedComponentMediaImage(image: ComponentMediaImage) {
  return {
    alt_text: image.alt_text,
    caption: image.description,
  }
}

type ImageSerializerProps = {
  image: ComponentMediaImage
  portrait?: boolean
  hero?: boolean
}

export class ImageSerializer {
  static serializeComponentMediaImage({
    image,
    portrait,
    hero,
  }: ImageSerializerProps): ImageSerializerResponse | undefined {
    const response = {
      ...serializedUploadFileEntity({
        image: image?.file?.data,
        portrait,
        hero,
      }),
      ...serializedComponentMediaImage(image),
    }

    return response as ImageSerializerResponse
  }
}
