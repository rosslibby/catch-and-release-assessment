import { useContext } from 'react'
import styles from './country.module.css'
import { cacheCtx } from '../cache'

export default function Country() {
  const { country } = useContext(cacheCtx)

  return country ? (
    <pre className={styles.pre}>
      <code>{JSON.stringify(country)}</code>
    </pre>
  ) : null
}
