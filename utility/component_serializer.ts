import { Cloudinary } from '@cloudinary/url-gen'
import { fill } from '@cloudinary/url-gen/actions/resize'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'

import {
  ComponentMediaImage,
  Maybe,
  Scalars,
  UploadFileEntityResponse,
} from '@strapi/types'
import { Delivery } from '@cloudinary/url-gen/actions/delivery'

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

type SerializedUploadFileEntityResponseProps = {
  file: Maybe<UploadFileEntityResponse> | undefined
  portrait?: boolean
  hero?: boolean
}

export function serializedUploadFileEntityResponse({
  file,
  portrait,
  hero,
}: SerializedUploadFileEntityResponseProps): ImageSerializerResponse {
  const file_attributes = file?.data?.attributes
  const provider_metadata = file_attributes?.provider_metadata

  let cloudImage
  let imageURL: string

  if (provider_metadata) {
    const cld = cloudinary()
    cloudImage = cld.image(provider_metadata.public_id)
    cloudImage.delivery(Delivery.format('auto'))

    if (hero) {
      cloudImage.resize(fill().width(1920).height(1080).gravity(autoGravity()))
    } else if (portrait) {
      cloudImage.resize(fill().width(800).height(1080).gravity(autoGravity()))
    } else {
      cloudImage.resize(fill().height(1080).width(1600).gravity(autoGravity()))
    }

    imageURL = cloudImage.toURL()
  } else {
    imageURL = file_attributes?.url ?? ''
  }

  return {
    url: imageURL,
    alt_text: file_attributes?.alternativeText ?? '',
    caption: file_attributes?.caption ?? '',
    width: file_attributes?.width ?? 0,
    height: file_attributes?.height ?? 0,
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
  static serialize({
    image,
    portrait,
    hero,
  }: ImageSerializerProps): ImageSerializerResponse | undefined {
    const response = {
      ...serializedUploadFileEntityResponse({
        file: image?.file,
        portrait,
        hero,
      }),
      ...serializedComponentMediaImage(image),
    }

    return response as ImageSerializerResponse
  }
}
