import { getPage } from './api/content-queries'
import { Page } from './api/graphql-types'
import renderComponent from './utility/render_component'
import Header from './components/Header'
import styles from './styles/page.module.scss'

export default async function Page() {
  const data: Page = await getPage('home')
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
