import Link from 'next/link'
import { PrimaryNav } from '../Navigation'
import styles from './header.module.scss'
import Image from 'next/image'

import logo from '../../../../public/images/logo.svg'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <h1>
          <Link href="/">
            <Image src={logo} alt="HSM Classics" />
          </Link>
        </h1>

        <PrimaryNav />
      </div>
    </header>
  )
}
