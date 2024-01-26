import { Ref, forwardRef, useContext, useEffect, useImperativeHandle, useRef } from 'react'
import styles from './suggestions.module.css'
import { cacheCtx } from '../../cache'
import { Country } from '../../cache/types'
import Suggestion from './suggestion'
import { useNav } from './hooks'

export default forwardRef(function Suggestions(
  _, forwardedRef: Ref<HTMLUListElement>
) {
  const { results } = useContext(cacheCtx)
  const ulRef = useRef<HTMLUListElement>(null)
  useImperativeHandle(forwardedRef, () => ulRef.current as HTMLUListElement)

  useNav(ulRef)

  return (
    <ul className={styles.suggestions} ref={ulRef}>
      {results.map((country: Country, index: number) => (
        <Suggestion country={country} key={`${country.code}-${index}`} />
      ))}
    </ul>
  )
})