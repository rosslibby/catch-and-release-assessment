import {
  Ref,
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from 'react'
import styles from './suggestions.module.css'
import { appCtx } from '@/app/data'
import { Country } from '@/app/data/types'
import Suggestion from './suggestion'
import { useNav } from './hooks'

export default forwardRef(function Suggestions(
  _, forwardedRef: Ref<HTMLUListElement>
) {
  const { results } = useContext(appCtx)
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
