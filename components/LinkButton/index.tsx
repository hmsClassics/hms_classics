import { ComponentLayoutButton } from '@strapi/types'
import styles from './link_button.module.scss'
import Link from 'next/link'

export default function LinkButton({
  id,
  link_target,
  button_text,
}: ComponentLayoutButton) {
  return (
    <Link href={link_target} className={styles.link_button}>
      {button_text}
    </Link>
  )
}
