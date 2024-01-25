'use client'
import styles from './page.module.css'
import Country from './country'
import { ChangeEvent, useRef, useState } from 'react'

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState<string>('')

  return (
    <main className={styles.wrapper}>
      <h1>Enter text</h1>
      <div className={styles.search} id="search">
        <input
          className={styles.input}
          id="input"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value.toUpperCase())}
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
        >Submit</button>
        <button id="reset" className={styles.button}>Reset</button>
      </div>
    </main>
  )
}
