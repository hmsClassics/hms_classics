import styles from './footer.module.scss'
import { FooterNav } from '@components/Navigation'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <p>© {new Date().getFullYear()} HMS Classics</p>

        <FooterNav />
      </div>
    </footer>
  )
}
