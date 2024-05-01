import cx from 'classnames'

import Link from 'next/link'
import { PrimaryNav } from '@components/Navigation'
import styles from './header.module.scss'
import { ComponentLayoutHeader } from '@strapi/types'
import { serializedUploadFileEntity } from '@utility/component_serializer'
import Image from 'next/image'
import RasterLogo from '../icons/RasterLogo'

export default function Header({
  heroTitle,
  background,
  type,
}: ComponentLayoutHeader) {
  const hero = type === 'full'
  const constrained = type === 'constrained'
  console.log('constrained 🦠', constrained)

  // use cloudinary to get smallest image possible
  const serializedImage =
    background &&
    serializedUploadFileEntity({
      image: background?.data,
      portrait: false,
      hero: true,
    })

  const headerStyles = cx(styles.header, {
    [styles['header--hero']]: hero,
    [styles['header--regular']]: !hero,
    [styles['header--constrained']]: constrained,
    [styles.hero]: hero,
  })

  return (
    <header className={headerStyles}>
      <div className={styles.header__content}>
        <h1>
          <Link title={heroTitle || 'HMS Classics'} href="/">
            <RasterLogo tone={hero ? 'light' : 'dark'} />
          </Link>
        </h1>

        <PrimaryNav hero={hero} />
      </div>

      {constrained && (
        <div className={styles.header__constrained_image}>
          <Image
            src={serializedImage?.url || '/images/home-header-bg.webp'}
            alt={serializedImage?.alt_text || 'home header background'}
            width={serializedImage?.width}
            height={serializedImage?.height}
            className={styles.hero__background__image}
            priority
          />
        </div>
      )}

      {/* TODO: make this a separate component */}
      {hero && (
        <>
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
