import cx from 'classnames'
import styles from './mediaGrids.module.scss'
import { ComponentLayoutImageGrid } from '../../api/graphql-types'
import Img from '../Image'

export default function MediaGrid({ images, style }: ComponentLayoutImageGrid) {
  const gridType = style || 'auto'
  const gridClasses = cx(styles.media_grid, {
    [styles[gridType]]: style,
    [styles[`auto--${images?.length}`]]: gridType === 'auto',
  })

  return (
    <div className={gridClasses}>
      {images?.map((image) => image && <Img {...image} key={image.id} />)}
    </div>
  )
}
