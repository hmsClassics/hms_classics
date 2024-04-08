import { ComponentUtilityLabelValue, Maybe } from '@/strapi_api/types'
import styles from './carDetails.module.scss'

type Props = {
  specs: Maybe<ComponentUtilityLabelValue>[]
}

export default function CarDetails({ specs }: Props) {
  return (
    <div className={styles.column_one}>
      {specs?.map((spec) => {
        if (!spec) return null

        return (
          <div className="spec" key={spec.id}>
            <p>
              <strong>{spec.label}</strong>
            </p>
            <p>{spec.value}</p>
          </div>
        )
      })}
    </div>
  )
}
