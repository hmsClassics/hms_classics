import cx from 'classnames'
import Link from 'next/link'

import styles from './navigation.module.scss'
import { FooterNavigation, PrimaryNavigation } from '@api/graphql-types'
import {
  getFooterNavigation,
  getPrimaryNavigation,
} from '@api/navigation-query'

type PrimaryNavProps = {
  hero?: boolean
}

export async function PrimaryNav({ hero }: PrimaryNavProps) {
  const data: PrimaryNavigation = await getPrimaryNavigation()
  const links = data?.links
  const navStyles = cx(styles.nav, styles.nav__primary, {
    [styles['nav--hero']]: hero,
  })

  return (
    <nav className={navStyles}>
      <input
        type="checkbox"
        id="nav__checkbox"
        className={styles.nav__checkbox}
      />
      <label htmlFor="nav__checkbox" className={styles.nav__toggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          className={styles.nav__menu_icon}
          viewBox="0 0 32 32">
          <path d="M16 4h16" className={styles.nav__menu_icon__top} />
          <path d="M6 16h26" className={styles.nav__menu_icon__middle} />
          <path d="M0 28h32" className={styles.nav__menu_icon__bottom} />
        </svg>

        <svg
          className={styles.nav__close_icon}
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          id="Layer_1"
          x="0"
          y="0"
          version="1.1"
          viewBox="0 0 32 32">
          <path
            d="M29 29 3 3M29 3 3 29"
            className={styles.nav__close_icon__main_line}
          />
          <path
            d="M31 5 5 31"
            className={styles.nav__close_icon__secondary_line}
          />
        </svg>
      </label>
      <ul className={styles.nav__menu}>
        {links?.map((link) => (
          <li key={link?.id}>
            <Link href={link?.url as string} title={link?.title as string}>
              {link?.linkText}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export async function FooterNav() {
  const data: FooterNavigation = await getFooterNavigation()
  const links = data?.links
  return (
    <nav className={cx(styles.nav, styles.nav__footer)}>
      <ul className={styles.nav__menu}>
        {links?.map((link) => (
          <li key={link?.id}>
            <Link href={link?.url as string} title={link?.title as string}>
              {link?.linkText}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
