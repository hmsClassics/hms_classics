import cx from 'classnames'
import styles from './mediaGrids.module.scss'
import {
  ComponentLayoutImageGrid,
  UploadFileEntityResponse,
} from '../../api/graphql-types'
import Img from '../Image'

export default function MediaGrid({ images, style }: ComponentLayoutImageGrid) {
  const fileInfo = ({ data }: UploadFileEntityResponse) => ({
    src: data?.attributes?.url || '',
    alt: data?.attributes?.alternativeText || '',
    width: data?.attributes?.width || 900,
    height: data?.attributes?.height || 450,
    provider_metadata: data?.attributes?.provider_metadata || '',
  })

  const imagesInfo = images?.map((image) => {
    if (image?.file) {
      return fileInfo(image.file)
    }
  })

  const gridClasses = cx(styles.media_grid, {
    [styles[style || 'auto']]: style,
  })

  return (
    <div className={gridClasses}>
      {imagesInfo?.map((image) => {
        if (image) {
          return (
            <Img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              key={image.provider_metadata.id}
            />
          )
        }
      })}
    </div>
  )
}
