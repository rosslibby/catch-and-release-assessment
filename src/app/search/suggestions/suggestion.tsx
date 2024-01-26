import { Country } from '@/app/cache/types'
import styles from './suggestions.module.css'
import { useContext, useRef } from 'react'
import { cacheCtx } from '@/app/cache'

export default function Suggestion({ country }: {
  country: Country
}) {
  const liRef = useRef<HTMLLIElement>(null)
  const { _: { setCountry, setResults } } = useContext(cacheCtx)
  const handleClick = () => {
    setCountry(country)
    setResults([])
  }

  return (
    <li
      className={styles.suggestion}
      onClick={handleClick}
      ref={liRef}
      tabIndex={0}
    >
      {`(${country.code}) ${country.name}`}
    </li>
  )
}
