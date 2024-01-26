import { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from 'react'
import styles from './search.module.css'
import { useSearch } from './hooks'
import { cacheCtx, useCache } from '../cache'
import { Country } from '../cache/types'

export default function Search() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { results, _: { setCountry } } = useContext(cacheCtx)
  const { addCountry, clear, hasCountry, isEmpty } = useCache()
  const { filter } = useSearch()
  const [value, setValue] = useState<string>('')

  const submit = useCallback(async () => {
    const cached = await hasCountry(value)

    if (!cached) {
      const { data } = await (await fetch(`/api/country/${value.toUpperCase()}`)).json()
      addCountry(data)
      setCountry(data)
    } else {
      setCountry(cached)
    }
  }, [addCountry, hasCountry, setCountry, value])

  useEffect(() => {
    let current = inputRef.current || null
    const handleEnterKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        submit()
      }
    }

    if (current) {
      current.addEventListener('keydown', handleEnterKey)
    }

    return () => {
      current?.removeEventListener('keydown', handleEnterKey)
      current = null
    }
  }, [inputRef, submit])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.toUpperCase())
    filter(e.target.value)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <input
          autoComplete="hellno"
          className={styles.input}
          onChange={handleInputChange}
          placeholder="Type a country"
          ref={inputRef}
          type="text"
        />
        <input type="hidden" />
        {results && (
          <ul className={styles.suggestions}>
            {results.map((country: Country) => (
              <li key={country.code} className={styles.suggestion}>
                {`(${country.code}) ${country.name}`}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="buttons">
        <button
          className={styles.button}
          disabled={value.length !== 2 || !value.match(/[A-Z]{2}/g)}
          id="submit"
          onClick={submit}
        >Submit</button>
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
