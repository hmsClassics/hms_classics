import { type Metadata } from 'next/types'

import { getCar } from '@strapi/car-query'
import { Car } from '@strapi/types'
import renderComponent from '@utility/render_component'
import Header from '@components/Header'
import styles from '@styles/car-page.module.scss'
import { serializedUploadFileEntity } from '@utility/component_serializer'
import { PageProps } from '@/.next/types/app/[page]/page'
import CarDetails from '@components/CarDetails'
import ShareButton from '@components/ShareButton'

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const data: Car = await getCar(params.slug)
  const pageSeo = data.seo
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

export default async function Page({ params }: { params: { slug: string } }) {
  const data: Car = await getCar(params.slug)
  const { content, specs, seo, themeColor } = data

  return (
    <>
      <Header {...data?.headerType} />
      <main className={styles.main}>
        <div className={styles.content_wrapper}>
          <div className={styles.column_one}>
            <CarDetails specs={specs} themeColor={themeColor} />
            <ShareButton seo={seo} slug={params.slug} />
          </div>
          <div className={styles.column_two}>
            {content?.map(renderComponent)}
          </div>
        </div>
      </main>
    </>
  )
}
