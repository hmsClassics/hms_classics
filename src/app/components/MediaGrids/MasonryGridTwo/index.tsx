'use client'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import styles from './MasonryGridTwo.module.scss'

interface MasonryGridTwoProps {
  children: React.ReactNode
}

export default function MasonryGridTwo({ children }: MasonryGridTwoProps) {
  const gutter = styles.newMediaGridGap
  const columnsCountBreakPoints = { 350: 1, 750: 2, 900: 3 }

  return (
    <ResponsiveMasonry
      className={styles.masonryGrid__wrapper}
      columnsCountBreakPoints={columnsCountBreakPoints}>
      <Masonry gutter={gutter}>{children}</Masonry>
    </ResponsiveMasonry>
  )
}
