import cx from 'classnames'
import styles from './mediaGrids.module.scss'
import { ComponentLayoutImageGrid } from '../../api/graphql-types'
import Img from '../Image'

export default function MediaGrid({ images, style }: ComponentLayoutImageGrid) {
  const gridClasses = cx(styles.media_grid, {
    [styles[style || 'auto']]: style,
  })

  return (
    <div className={gridClasses}>
      {images?.map((image) => image && <Img {...image} key={image.id} />)}
    </div>
  )
}
