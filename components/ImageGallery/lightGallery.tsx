'use client'

import LightGallery from 'lightgallery/react'

import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css'

// Plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'

import styles from './imageGallery.module.scss'
import { LIGHTBOX_SELECTOR } from './helpers'

export default function ImageLightGallery({
  children,
}: {
  children: React.ReactNode
}) {
  const onInit = () => {
    console.log('lightGallery has been initialized')
  }

  return (
    <div className={styles.imageGallery}>
      <div className={styles.imageGallery__content}>
        <LightGallery
          onInit={onInit}
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          addClass={styles.lightBoxComponent}
          licenseKey={
            process.env.NEXT_PUBLIC_LIGHTGALLERY_LICENSE_KEY ||
            '42EE40A0-8472-48AD-9E6A-801E198E0B6B'
          }
          selector={LIGHTBOX_SELECTOR(true)}>
          {children}
        </LightGallery>
      </div>
    </div>
  )
}
