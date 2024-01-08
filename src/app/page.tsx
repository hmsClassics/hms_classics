import { getPage } from './api/content-queries'
import Header from './components/Header'
import { H1, H2 } from './components/Typography/Headings'
import P from './components/Typography/Paragraph'
import Video from './components/Video'
import Img from './components/Image'
import styles from './page.module.scss'
import { Page } from './api/graphql-types'
import MediaGrid from './components/MediaGrids'

export default async function Home() {
  const data: Page = await getPage('home')
  console.log('💾 DATA', data)

  return (
    <>
      <Header {...data?.headerType} />
      <main className={styles.main}>
        <div className={styles.content_wrapper}>
          {data.content?.map((section) => {
            // if (section.__typename === 'ComponentLayoutText') {
            //   return (
            //     <div className={styles.text} key={section.id}>
            //       <H1>{section.title}</H1>
            //       <P>{section.text}</P>
            //     </div>
            //   )
            // }
            // if (section.__typename === 'ComponentLayoutVideo') {
            //   return (
            //     <div className={styles.video} key={section.id}>
            //       <Video {...section} />
            //     </div>
            //   )
            // }
            if (section?.__typename === 'ComponentLayoutImageGrid') {
              return <MediaGrid {...section} key={section.id} />
            }
          })}
        </div>
      </main>
    </>
  )
}
