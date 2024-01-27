import { useContext } from 'react'
import styles from './country.module.css'
import { cacheCtx } from '@/app/cache'

export default function Country() {
  const { country } = useContext(cacheCtx)

  return country ? (
    <div>
      <ul className={styles.country}>
        {Object.entries(country).map(([key, value]: [string, string]) => (
          <li key={key}>
            <span className={styles.key}>{key}:</span>
            <span className={styles.value}>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  ) : null
}
