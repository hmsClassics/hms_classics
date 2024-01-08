import { getPage } from './api/content-queries'
import Header from './components/Header'
import styles from './page.module.scss'
import { Page } from './api/graphql-types'
import MediaGrid from './components/MediaGrids'
import renderComponent from './utility/render_component'

export default async function Home() {
  const data: Page = await getPage('home')
  const pageContent = data?.content
  console.log('💾 DATA', pageContent)

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
