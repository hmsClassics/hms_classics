import { type Metadata } from 'next/types'

import { getCar } from '@strapi/car-query'
import { Car } from '@strapi/types'
import renderComponent from '@utility/render_component'
import Header from '@components/Header'
import styles from '@styles/car-page.module.scss'
import { serializedUploadFileEntityResponse } from '@utility/component_serializer'
import { PageProps } from '@/.next/types/app/[page]/page'
import { H4 } from '@/components/Typography/Headings'

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const data: Car = await getCar(params.slug)
  const pageSeo = data.seo
  const image_info = serializedUploadFileEntityResponse({
    file: pageSeo?.socialImage,
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
  const pageContent = data?.content

  return (
    <>
      <Header {...data?.headerType} />
      <main className={styles.main}>
        <div className={styles.content_wrapper}>
          <div className={styles.column_one}>
            <H4>Column One</H4>
          </div>
          <div className={styles.column_two}>
            {pageContent && pageContent.map(renderComponent)}
          </div>
        </div>
      </main>
    </>
  )
}
