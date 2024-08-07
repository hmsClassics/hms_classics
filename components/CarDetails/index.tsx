import cx from 'classnames'
import { ComponentUtilityLabelValue, Maybe } from '@/strapi_api/types'
import localFont from 'next/font/local'
import styles from './carDetails.module.scss'

type Props = {
  specs: Maybe<ComponentUtilityLabelValue>[]
  themeColor?: Maybe<string> | undefined
}

const heveticaNueuCondensedBold = localFont({
  src: '../../fonts/Helvetica-Neue-Condensed-Bold.woff2',
  variable: '--font-helvetica-neue-condensed-bold',
})

export default function CarDetails({ specs, themeColor }: Props) {
  const featured_color = themeColor || '#fff'
  return (
    <div
      className={styles.carDetails}
      style={{ '--theme-color': featured_color } as React.CSSProperties}>
      {specs?.map((spec) => {
        if (!spec) return null

        return (
          <div
            className={cx(heveticaNueuCondensedBold.className, styles.spec)}
            key={spec.id}>
            <p className={styles['spec__title']}>{spec.label}</p>
            <p className={styles['spec__value']}>{spec.value}</p>
          </div>
        )
      })}
    </div>
  )
}
