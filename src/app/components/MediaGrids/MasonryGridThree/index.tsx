import styles from './MasonryGridThree.module.scss'

interface MasonryGridThreeProps {
  children: React.ReactNode
}

export default function MasonryGridThree({ children }: MasonryGridThreeProps) {
  return (
    <div className={styles.masonryGrid}>
      <div className={styles.masonryGrid__wrapper}>{children}</div>
    </div>
  )
}
