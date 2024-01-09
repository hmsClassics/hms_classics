import { type Metadata } from 'next/types'

import { getPage } from '../api/page-query'
import { Page } from '../api/graphql-types'
import renderComponent from '../utility/render_component'
import Header from '../components/Header'
import styles from '../styles/page.module.scss'
import { serializedUploadFileEntityResponse } from '../utility/component_serializer'
import { PageProps } from '@/.next/types/app/page'

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const data: Page = await getPage(params.page)
  const pageSeo = data?.seo
  const image_info = serializedUploadFileEntityResponse(pageSeo.socialImage)

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

export default async function Page({ params }: { params: { page: string } }) {
  const data: Page = await getPage(params.page)
  const pageContent = data?.content

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
