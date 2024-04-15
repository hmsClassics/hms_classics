import { ComponentMediaImageGallery } from '@/strapi_api/types'

import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css'

import styles from './imageGallery.module.scss'
import MasonryGridThree from '@components/MediaGrids/MasonryGridThree'
import { renderThumbnial } from './helpers'
import ImageLightGallery from './lightGallery'

export default function GalleryGrid({
  images: { data: images },
}: ComponentMediaImageGallery) {
  return (
    <div className={styles.imageGallery}>
      <div className={styles.imageGallery__content}>
        <ImageLightGallery>
          <MasonryGridThree>
            {images.map((image) => renderThumbnial(image))}
          </MasonryGridThree>
        </ImageLightGallery>
      </div>
    </div>
  )
}
