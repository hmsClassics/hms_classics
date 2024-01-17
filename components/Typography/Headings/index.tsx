import { ComponentLayoutHeading } from '@strapi/types'
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

const Heading = ({ id, level, text }: ComponentLayoutHeading) => {
  switch (level) {
    case 'h1':
      return <H1 key={id}>{text}</H1>
    case 'h2':
      return <H2 key={id}>{text}</H2>
    case 'h3':
      return <H3 key={id}>{text}</H3>
    case 'h4':
      return <H4 key={id}>{text}</H4>
    default:
      return <H1 key={id}>{text}</H1>
  }
}

export { Heading, H1, H2, H3, H4 }
