import { Cloudinary } from '@cloudinary/url-gen'

import {
  ComponentMediaImage,
  Maybe,
  Scalars,
  UploadFileEntityResponse,
} from '@strapi/graphql-types'
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
  file: Maybe<UploadFileEntityResponse> | undefined
) {
  const file_attributes = file?.data?.attributes
  const provider_metadata = file_attributes?.provider_metadata

  let cloudImage
  let imageURL: string

  if (provider_metadata) {
    const cld = cloudinary()
    cloudImage = cld.image(provider_metadata.public_id)
    cloudImage.delivery(Delivery.format('auto'))

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
