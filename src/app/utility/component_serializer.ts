import {
  ComponentMediaImage,
  Maybe,
  Scalars,
  UploadFileEntityResponse,
} from '../api/graphql-types'

export interface ImageSerializerResponse {
  url: string
  alt_text: string
  caption?: string
  width: number
  height: number
  provider_metadata: Maybe<Scalars['JSON']['output']>
}

export class ImageSerializer {
  static serialize(
    image: ComponentMediaImage
  ): ImageSerializerResponse | undefined {
    const response = {
      ...ImageSerializer.serializedUploadFileEntityResponse(image.file),
      ...ImageSerializer.serializedComponentMediaImage(image),
    }

    // console.log('ImageSerializer.serialize', response)

    return response as ImageSerializerResponse
  }

  static serializedUploadFileEntityResponse(file: UploadFileEntityResponse) {
    return {
      url: file.data?.attributes?.url ?? '',
      alt_text: file.data?.attributes?.alternativeText ?? '',
      caption: file.data?.attributes?.caption ?? '',
      width: file.data?.attributes?.width ?? 0,
      height: file.data?.attributes?.height ?? 0,
      provider_metadata: file.data?.attributes?.provider_metadata ?? '',
    }
  }

  static serializedComponentMediaImage(image: ComponentMediaImage) {
    return {
      alt_text: image.alt_text,
      caption: image.description,
    }
  }
}
