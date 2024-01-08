import { Cloudinary } from '@cloudinary/url-gen'

import {
  ComponentMediaImage,
  Maybe,
  Scalars,
  UploadFileEntityResponse,
} from '../api/graphql-types'
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

export function serializedUploadFileEntityResponse(
  file: UploadFileEntityResponse
) {
  const provider_metadata = file.data?.attributes?.provider_metadata

  let cloudImage
  let imageURL: string

  if (provider_metadata) {
    const cld = cloudinary()
    cloudImage = cld.image(provider_metadata.public_id)
    cloudImage.delivery(Delivery.format('auto'))

    imageURL = cloudImage.toURL()
  } else {
    imageURL = file.data?.attributes?.url ?? ''
  }

  return {
    url: imageURL,
    alt_text: file.data?.attributes?.alternativeText ?? '',
    caption: file.data?.attributes?.caption ?? '',
    width: file.data?.attributes?.width ?? 0,
    height: file.data?.attributes?.height ?? 0,
  }
}

export function serializedComponentMediaImage(image: ComponentMediaImage) {
  return {
    alt_text: image.alt_text,
    caption: image.description,
  }
}

export class ImageSerializer {
  static serialize(
    image: ComponentMediaImage
  ): ImageSerializerResponse | undefined {
    const response = {
      ...serializedUploadFileEntityResponse(image.file),
      ...serializedComponentMediaImage(image),
    }

    return response as ImageSerializerResponse
  }
}
