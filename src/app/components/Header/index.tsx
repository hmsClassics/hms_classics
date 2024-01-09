import cx from 'classnames'

import Link from 'next/link'
import { PrimaryNav } from '../Navigation'
import styles from './header.module.scss'
import Logo from '../icons/Logo'
import { ComponentLayoutHeader } from '../../api/graphql-types'
import { serializedUploadFileEntityResponse } from '../../utility/component_serializer'
import Image from 'next/image'

export default function Header({
  heroTitle,
  background,
  type,
}: ComponentLayoutHeader) {
  const hero = type === 'hero_1'

  // use cloudinary to get smallest image possible
  const serializedImage =
    background && serializedUploadFileEntityResponse(background)

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
        <>
          <div className={styles.hero__title}>
            <h2>{heroTitle}</h2>
          </div>
          <div className={styles.hero__background}>
            <Image
              src={serializedImage?.url || '/images/home-header-bg.webp'}
              alt={serializedImage?.alt_text || 'home header background'}
              width={serializedImage?.width}
              height={serializedImage?.height}
              className={styles.hero__background__image}
              priority
            />
          </div>
        </>
      )}
    </header>
  )
}
