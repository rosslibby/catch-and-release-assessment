import { Country } from '@/app/data/types'
import styles from './suggestions.module.css'
import { useContext, useRef } from 'react'
import { appCtx } from '@/app/data'

export default function Suggestion({ country }: {
  country: Country
}) {
  const liRef = useRef<HTMLLIElement>(null)
  const { _: { setCountry, setResults } } = useContext(appCtx)
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
