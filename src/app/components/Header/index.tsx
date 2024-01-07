import cx from 'classnames'

import Link from 'next/link'
import { PrimaryNav } from '../Navigation'
import styles from './header.module.scss'
import Image from 'next/image'

import logo from '../../../../public/images/logo.svg'
import Logo from '../icons/Logo'

type HeaderProps =
  | {
      hero: true
      title: string
    }
  | {
      hero?: never
      title?: never
    }

export default function Header({ title, hero }: HeaderProps) {
  const headerStyles = cx(styles.header, {
    [styles['header--hero']]: hero,
    [styles.hero]: hero,
  })

  return (
    <header className={headerStyles}>
      <div className={styles.header__content}>
        <h1>
          <Link href="/">
            <Logo tone={hero ? 'light' : 'dark'} />
          </Link>
        </h1>

        <PrimaryNav hero={hero} />
      </div>

      {hero && (
        <div className={styles.hero__title}>
          <h2>{title}</h2>
        </div>
      )}
    </header>
  )
}
