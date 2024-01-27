import { useContext } from 'react'
import styles from './loading.module.css'
import { appCtx } from '@/app/data'

export default function Loading() {
  const { loading } = useContext(appCtx)

  return loading ? (
    <div className={styles.ring}>
      <div />
      <div />
      <div />
      <div />
    </div>
  ) : (
    <span />
  )
}
