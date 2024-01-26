import styles from './loading.module.css'

export default function Loading() {
  return (
    <div className={styles.ring}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
