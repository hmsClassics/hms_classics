import cx from 'classnames'
import { type Metadata } from 'next/types'

import { getPage } from '@strapi/page-query'
import { Page } from '@strapi/types'
import renderComponent from '@utility/render_component'
import Header from '@components/Header'
import styles from '@styles/home.module.scss'
import { serializedUploadFileEntity } from '@utility/component_serializer'

export const generateMetadata = async (): Promise<Metadata> => {
  const data: Page = await getPage('home')
  const pageSeo = data?.seo
  const image_info = serializedUploadFileEntity({
    image: pageSeo?.socialImage?.data,
  })

  const metadata: Metadata = {
    title: pageSeo.htmlTitle,
    description: pageSeo.htmlDescription,
    openGraph: {
      images: [
        {
          url: image_info.url,
          width: image_info.width,
          height: image_info.height,
          alt: image_info.alt_text,
        },
      ],
      url: `${process.env.NEXT_PUBLIC_ROOT_URL}/`,
      type: 'website',
      siteName: pageSeo.htmlTitle,
      locale: 'en_US',
    },
  }

  return metadata
}

export default async function Page() {
  const data: Page = await getPage('home')
  const pageContent = data.content

  const contentBlockImgLeftClasses = cx(
    styles.contentBlock,
    styles['contentBlock--image-left']
  )
  const contentBlockImgRightClasses = cx(
    styles.contentBlock,
    styles['contentBlock--image-right']
  )
  const contentFeaturedBlockImgRightClasses = cx(
    styles.contentBlock,
    styles['contentBlock--featured-image-right']
  )
  const contentFeaturedBlockImgLeftClasses = cx(
    styles.contentBlock,
    styles['contentBlock--featured-image-left']
  )

  return (
    <>
      <Header {...data?.headerType} />
      <main className={styles.main}>
        <div className={styles.content_wrapper}>
          {pageContent && pageContent.map(renderComponent)}
        </div>
      </main>
    </>
  )
}
