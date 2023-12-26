import cx from 'classnames'
import Image from 'next/image'

import styles from './image.module.scss'

export interface ImageProps {
  src: string
  alt: string
  width: number
  height: number
  inMasonry?: boolean
}

export default function Img({
  src,
  alt,
  width,
  height,
  inMasonry = false,
}: ImageProps) {
  return (
    <div
      className={cx(styles.image__wrapper, { [styles.inMasonry]: inMasonry })}>
      <Image
        src={src}
        alt={alt}
        className={styles.image}
        width={width}
        height={height}
      />
    </div>
  )
}
