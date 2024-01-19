import { ComponentMediaVideo } from '@/strapi_api/types'
import styles from './video.module.scss'
import WistiEmbed from './WistiaEmbed'

export default function Video({ id, wistia_oEmbed_url }: ComponentMediaVideo) {
  const regex = /medias\/(\w+)\?/
  const match = wistia_oEmbed_url?.match(regex)
  const videoId = match ? match[1] : null

  return (
    <div className={styles.video} key={`wistia_video_${id}`}>
      {videoId !== null && <WistiEmbed videoId={videoId} />}
    </div>
  )
}
