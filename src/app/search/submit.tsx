import styles from './search.module.css'

export default function SubmitButton({ loading, submit, value }: {
  loading: boolean
  submit: () => Promise<void>
  value: string
}) {
  return (
    <button
      className={styles.searchButton}
      disabled={value.length !== 2 || !value.match(/[A-Z]{2}/g) || loading}
      id="submit"
      onClick={submit}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
      </svg>
    </button>
  )
}
