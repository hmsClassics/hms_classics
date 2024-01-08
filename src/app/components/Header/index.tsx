import cx from 'classnames'

import Link from 'next/link'
import { PrimaryNav } from '../Navigation'
import styles from './header.module.scss'
import Image from 'next/image'

import logo from '../../../../public/images/logo.svg'
import Logo from '../icons/Logo'
import { ComponentLayoutHeader } from '../../api/graphql-types'

export default function Header({
  heroTitle,
  background,
  type,
}: ComponentLayoutHeader) {
  const hero = type === 'hero_1'

  // use cloudinary to get smallest image possible
  const backgroundImg = background?.data?.attributes?.url

  const headerStyles = cx(styles.header, {
    [styles['header--hero']]: hero,
    [styles.hero]: hero,
  })

  const backgroundStyles = `linear-gradient(
        to bottom,
        rgba(43, 43, 35, 0.75),
        rgba(0, 0, 0, 0.15)
      ), url(${backgroundImg})`

  return (
    <header
      className={headerStyles}
      style={{ backgroundImage: backgroundStyles }}>
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
          <h2>{heroTitle}</h2>
        </div>
      )}
    </header>
  )
}
