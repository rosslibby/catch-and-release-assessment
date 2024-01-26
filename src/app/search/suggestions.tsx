import { useContext } from 'react'
import styles from './suggestions.module.css'
import { cacheCtx } from '../cache'
import { Country } from '../cache/types'

export default function Suggestions() {
  const { results, _: { setCountry, setResults } } = useContext(cacheCtx)
  const handleClick = (country: Country) => {
    setCountry(country)
    setResults([])
  }

  return (
    <ul className={styles.suggestions}>
      {results.map((country: Country) => (
        <li
          key={country.code}
          className={styles.suggestion}
          onClick={() => handleClick(country)}
        >
          {`(${country.code}) ${country.name}`}
        </li>
      ))}
    </ul>
  )
}
