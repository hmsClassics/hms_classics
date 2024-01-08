import { getPage } from './api/content-queries'
import { Page } from './api/graphql-types'
import renderComponent from './utility/render_component'
import Header from './components/Header'
import styles from './page.module.scss'

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
