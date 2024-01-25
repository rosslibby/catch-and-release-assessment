'use client'
import styles from './page.module.css'
import Country from './country'

export default function Home() {
  return (
    <main className={styles.wrapper}>
      <h1>Enter text</h1>
      <div className={styles.search} id="search">
        <input
          className={styles.input}
          id="input"
          placeholder="Type a country"
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
          id="submit"
        >Submit</button>
        <button id="reset" className={styles.button}>Reset</button>
      </div>
    </main>
  )
}
