'use client'
import styles from './page.module.css'
import Country from './country'
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { cacheCtx, useCache } from './cache'

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { addCountry, clear, hasCountry, isEmpty } = useCache()
  const { _: { setCountry } } = useContext(cacheCtx)
  const [value, setValue] = useState<string>('')

  const submit = useCallback(async () => {
    const cached = await hasCountry(value)

    if (!cached) {
      console.log('Fetching because it is not cached')
      const { data: { country } } = await (await fetch(`/api/country/${value}`)).json()
      addCountry(country)
      setCountry(country)
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
  }

  return (
    <main className={styles.wrapper}>
      <h1>Enter text</h1>
      <div className={styles.search} id="search">
        <input
          className={styles.input}
          id="input"
          onChange={handleInputChange}
          placeholder="Type a country"
          ref={inputRef}
          type="text"
        />
        <input type="hidden" id="country-code" />
        <ul className={styles.suggestions} id="suggestions">
        </ul>
      </div>
      <Country />
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
    </main>
  )
}
