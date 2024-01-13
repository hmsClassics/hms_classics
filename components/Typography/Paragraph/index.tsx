import cx from 'classnames'
import styles from './paragraph.module.scss'

interface ParagraphProps {
  children: React.ReactNode
  extraClass?: string | string[]
}

export default function P({ children, extraClass }: ParagraphProps) {
  return <p className={cx(styles.p, extraClass)}>{children}</p>
}
