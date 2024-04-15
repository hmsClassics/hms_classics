'use client'

import cx from 'classnames'
import { ComponentUtilitySeo } from '@/strapi_api/types'
import styles from './shareButton.module.scss'

type Props = {
  seo: ComponentUtilitySeo
  slug: string
}

export default function ShareButton({ seo, slug }: Props) {
  const shareData = {
    title: seo.htmlTitle,
    text: seo.htmlDescription || '',
    url: `${process.env.NEXT_PUBLIC_ROOT_URL}/cars/${slug}`,
  }

  // share functionality via web share api, fallback to manual copy
  const share = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url)
        alert('Link copied to clipboard!')
      } catch (error) {
        console.error('Error copying to clipboard:', error)
      }
    }
  }

  return (
    <div className={styles.shareButtonWrapper}>
      <a href="" className={styles.shareButton} onClick={share}>
        Share
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="57"
          height="61"
          fill="none">
          <path
            fill="currentColor"
            d="M28.528 37.712c-1.044 0-1.864-.83-1.864-1.885V5.657c0-1.056.82-1.886 1.864-1.886s1.864.83 1.864 1.886v30.17c0 1.056-.82 1.885-1.864 1.885Z"
          />
          <path
            fill="currentColor"
            d="M35.986 15.085a1.735 1.735 0 0 1-1.305-.566l-6.152-6.222-6.152 6.222a1.831 1.831 0 0 1-2.647 0 1.882 1.882 0 0 1 0-2.677l7.494-7.505a1.831 1.831 0 0 1 2.647 0l7.457 7.542a1.882 1.882 0 0 1 0 2.678 1.862 1.862 0 0 1-1.305.566l-.038-.038ZM47.17 56.568H9.887c-3.094 0-5.592-2.526-5.592-5.656V24.513c0-3.13 2.498-5.657 5.592-5.657h7.457c1.044 0 1.864.83 1.864 1.886s-.82 1.885-1.864 1.885H9.887c-1.044 0-1.864.83-1.864 1.886v26.399c0 1.056.82 1.885 1.864 1.885H47.17c1.044 0 1.864-.83 1.864-1.885V24.513c0-1.056-.82-1.886-1.864-1.886h-7.456c-1.044 0-1.864-.83-1.864-1.885 0-1.056.82-1.886 1.864-1.886h7.456c3.095 0 5.593 2.527 5.593 5.657v26.399c0 3.13-2.498 5.656-5.593 5.656Z"
          />
        </svg>
      </a>
    </div>
  )
}
