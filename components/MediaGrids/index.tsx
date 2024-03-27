import cx from 'classnames'
import styles from './mediaGrids.module.scss'
import { ComponentLayoutImageGrid } from '@strapi/types'
import Img from '@components/Image'

export default function MediaGrid({
  gridImages,
  style,
}: ComponentLayoutImageGrid) {
  const gridType = style || 'auto'
  const gridClasses = cx(styles.media_grid, {
    [styles[gridType]]: style,
    [styles[`auto--${gridImages?.length}`]]: gridType === 'auto',
  })

  return (
    <div className={gridClasses}>
      {gridImages?.map(
        (image) => image && <Img componentMediaImage={image} key={image.id} />
      )}
    </div>
  )
}
