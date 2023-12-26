import cx from 'classnames'

import styles from './mediaGrids.module.scss'

interface MediaGridProps {
  children: React.ReactNode
  className?: string
}

const TwoByOne = ({ children, className }: MediaGridProps) => {
  return (
    <div className={cx(styles.img_grid, styles.two_by_one, className)}>
      {children}
    </div>
  )
}

const ThreeByOne = ({ children, className }: MediaGridProps) => {
  return (
    <div className={cx(styles.img_grid, styles.three_by_one, className)}>
      {children}
    </div>
  )
}

export { TwoByOne, ThreeByOne }
