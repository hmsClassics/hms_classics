import styles from './footer.module.scss'
import { FooterNav } from '../Navigation'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <p>© {new Date().getFullYear()} HSM Classics</p>

        <FooterNav />
      </div>
    </footer>
  )
}
