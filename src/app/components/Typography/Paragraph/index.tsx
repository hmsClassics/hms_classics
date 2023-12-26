import styles from './paragraph.module.scss'

interface ParagraphProps {
  children: React.ReactNode
}

export default function P({ children }: ParagraphProps) {
  return <p className={styles.p}>{children}</p>
}
