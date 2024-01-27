import { useContext } from 'react'
import styles from './country.module.css'
import { appCtx } from '@/app/data'
import { Country as CountryT } from '@/app/data/types'

const Title = ({ country }: {
  country: CountryT
}) => (
  <li>
    <span className={styles.title}>
      <span className={styles.emoji}>{country.emoji}</span>
      <span className={styles.code}>{country.code}</span>
    </span>
    <span>{country.name}</span>
  </li>
)

const Content = ({ $key, value }: {
  $key: string
  value: string
}) => {
  if ($key === 'native') {
    return (
      <span className={styles.value}>
        <em>{value}</em>
      </span>
    )
  } else if ($key === 'currency') {
    return (
      <span className={styles.value}>
        <em>{value.replaceAll(',', ', ')}</em>
      </span>
    )
  }

  return (
    <span className={styles.value}>{value}</span>
  )
}

export default function Country() {
  const { country } = useContext(appCtx)

  return country ? (
    <div>
      <ul className={styles.country}>
        <Title country={country} />
        {Object.entries(country).map(([key, value]: [string, string]) => !['emoji', 'code', 'name'].includes(key) ? (
          <li key={key}>
            <span className={styles.key}>{key}:</span>
            <Content $key={key} value={value} />
          </li>
        ) : null)}
      </ul>
    </div>
  ) : null
}
