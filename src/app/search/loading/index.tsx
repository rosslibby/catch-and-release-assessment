import styles from './loading.module.css'

export default function Loading({ loading }: {
  loading: boolean
}) {
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
