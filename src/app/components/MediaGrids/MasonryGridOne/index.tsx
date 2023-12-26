'use client'

import { Masonry } from '@fristys/masonry'

import styles from './MasonryGridOne.module.scss'
import { useEffect, useRef } from 'react'

interface MasonryGridOneProps {
  children: React.ReactNode
}

export default function MasonryGridOne({ children }: MasonryGridOneProps) {
  const masonaryRef = useRef(null)
  const gutter: number = Number(styles.mediaGridGap)
  const gutterUnit: string = styles.mediaGridGapUnit
  const options = {
    gutter,
    gutterUnit,
    columnBreakpoints: { 1280: 3, 740: 2 },
    loadedClass: styles.masonryLoaded,
  }

  useEffect(() => {
    masonaryRef.current && new Masonry(masonaryRef.current, options)
  }, [])

  return (
    <div className={styles.masonryGrid__wrapper}>
      <div className={styles.masonryGrid} ref={masonaryRef}>
        {children}
      </div>
    </div>
  )
}
