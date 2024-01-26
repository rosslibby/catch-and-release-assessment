import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import styles from './search.module.css'
import { useSearch } from './hooks'
import { cacheCtx, useCache } from '../cache'
import Suggestions from './suggestions'
import Loading from './loading'

export default function Search() {
  const suggestionsRef = useRef<HTMLUListElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { country, results, _: {
    setCountry,
    setResults,
  } } = useContext(cacheCtx)
  const { addCountry, clear, hasCountry, isEmpty } = useCache()
  const { filter } = useSearch()
  const [loading, setLoading] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const [feedback, setFeedback] = useState<string>('')

  const submit = useCallback(async () => {
    setFeedback('')
    setLoading(true)
    setResults([])
    setCountry(undefined)

    const cached = await hasCountry(value)

    if (!cached) {
      const { data } = await (await fetch(`/api/country/${value.toUpperCase()}`)).json()

      if (data) {
        addCountry(data)
        setCountry(data)
      } else {
        setFeedback(`No results found for ${value.toUpperCase()}`)
      }
    } else {
      setCountry(cached)
    }

    setLoading(false)
  }, [addCountry, hasCountry, setCountry, setFeedback, setLoading, value])

  useEffect(() => {
    let current = inputRef?.current || null

    if (current && country) {
      current.value = `(${country.code}) ${country.name}`
    }

    return () => {
      current = null
    }
  }, [country, inputRef, setValue])

  useEffect(() => {
    let current = inputRef.current || null
    let suggestions = suggestionsRef.current || null
    const handleEnterKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        submit()
      } else if (e.key === 'ArrowDown' && results.length && suggestions) {
        (suggestions.firstChild as HTMLElement)?.focus()
      }
    }

    if (current) {
      current.addEventListener('keydown', handleEnterKey)
    }

    return () => {
      current?.removeEventListener('keydown', handleEnterKey)
      current = null
      suggestions = null
    }
  }, [inputRef, results, suggestionsRef, submit])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.toUpperCase())
    filter(e.target.value)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <div className={styles.inputWrapper}>
          <input
            autoComplete="hellno"
            className={styles.input}
            onChange={handleInputChange}
            placeholder="Enter a country code (e.g. US)"
            ref={inputRef}
            type="text"
          />
          <Loading loading={loading} />
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

        </div>
        {results.length > 0 && (
          <Suggestions ref={suggestionsRef} />
        )}
      </div>
      {feedback.length > 0 && (
        <p>{feedback}</p>
      )}
      <div className="buttons">
        <button
          id="reset"
          className={styles.button}
          disabled={isEmpty}
          onClick={clear}
        >Refetch</button>
      </div>
    </div>
  )
}
