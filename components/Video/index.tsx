import styles from './video.module.scss'

export default function Video() {
  let videosrc = '/videos/test_footage.mp4'

  return (
    <div className={styles.video}>
      <div className={styles.video__container}>
        <video controls>
          <source src={videosrc} type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
