import styles from './headings.module.scss'

interface HeadingProps {
  children: React.ReactNode
}

const H1 = ({ children }: HeadingProps) => (
  <h1 className={styles.h1}>{children}</h1>
)

const H2 = ({ children }: HeadingProps) => (
  <h2 className={styles.h2}>{children}</h2>
)

const H3 = ({ children }: HeadingProps) => (
  <h3 className={styles.h3}>{children}</h3>
)

const H4 = ({ children }: HeadingProps) => (
  <h4 className={styles.h4}>{children}</h4>
)

export { H1, H2, H3, H4 }
