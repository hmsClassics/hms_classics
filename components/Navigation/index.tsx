import cx from 'classnames'
import Link from 'next/link'

import styles from './navigation.module.scss'
import { FooterNavigation, PrimaryNavigation } from '@strapi/types'
import {
  getFooterNavigation,
  getPrimaryNavigation,
} from '@strapi/navigation-query'

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
          width="38"
          height="38"
          fill="none"
          className={styles.nav__menu_icon}>
          <path
            className={styles.nav__menu_icon__middle}
            fill="#ECD686"
            d="M9 25.97 25.97 9l2.83 2.829-16.971 16.97z"
          />
          <path
            className={styles.nav__menu_icon__top_bottom}
            fill="#262022"
            d="M18 25.97 34.97 9l2.829 2.828L20.829 28.8 18 25.971ZM0 25.97 16.97 9l2.83 2.829-16.971 16.97z"
          />
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
