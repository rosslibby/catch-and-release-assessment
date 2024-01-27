import {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import styles from './search.module.css'
import { useSearch } from './hooks'
import Suggestions from './suggestions'
import Loading from './loading'
import { appCtx, useCache } from '@/app/data'
import SubmitButton from './submit'
import { useApi } from './hooks'

export default function Search() {
  const searchRef = useRef<HTMLDivElement>(null)
  const suggestionsRef = useRef<HTMLUListElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { country, loading, message, results } = useContext(appCtx)
  const { clear, isEmpty } = useCache()
  const { filter } = useSearch()
  const [value, setValue] = useState<string>('')
  const { submit } = useApi()
  const [focused, setFocused] = useState<boolean>(false)
  const searchClassnames = [
    styles.search,
    ...(focused ? [styles.searchFocus] : []),
  ].join(' ')

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
        submit(value)
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
      <div className={searchClassnames} ref={searchRef}>
        <div className={styles.inputWrapper}>
          <input
            autoComplete="hellno"
            className={styles.input}
            onChange={handleInputChange}
            placeholder="Enter a country code (e.g. US)"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            ref={inputRef}
            type="text"
          />
          <Loading loading={loading} />

          <SubmitButton
            loading={loading}
            submit={() => submit(value)}
            value={value}
          />

        </div>
        {results.length > 0 && (
          <Suggestions ref={suggestionsRef} />
        )}
      </div>
      {message && (
        <p>{message}</p>
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
