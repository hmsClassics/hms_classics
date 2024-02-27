import cx from 'classnames'
import styles from './icons.module.scss'
import Image from 'next/image'

type LogoProps = {
  tone?: 'light' | 'dark'
}

export default function RasterLogo({ tone = 'light' }: LogoProps) {
  const logoStyles = cx(styles.logo, {
    [styles['logo--light']]: tone === 'light',
    [styles['logo--dark']]: tone === 'dark',
  })

  if (tone === 'light') {
    return (
      <Image
        src="/images/hms_logo--light.png"
        alt="HMS Classics Logo"
        width={72}
        height={72}
      />
    )
  }

  return (
    <Image
      src="/images/hms_logo.png"
      alt="HMS Classics Logo"
      width={72}
      height={72}
    />
  )
}
