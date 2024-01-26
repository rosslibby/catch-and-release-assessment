'use client'
import styles from './page.module.css'
import Country from './country'
import Search from './search'

export default function Home() {
  return (
    <main className={styles.wrapper}>
      <h1>Search countries by code</h1>
      <Search />
      <Country />
    </main>
  )
}
