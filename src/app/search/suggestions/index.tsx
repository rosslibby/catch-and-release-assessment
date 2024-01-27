import {
  Ref,
  RefObject,
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
import { classnames } from '@/utils'

export default forwardRef(function Suggestions(
  { inputRef }: { inputRef: RefObject<HTMLInputElement>},
  forwardedRef: Ref<HTMLUListElement>,
) {
  const { results } = useContext(appCtx)
  const ulRef = useRef<HTMLUListElement>(null)
  const classNames = classnames([
    styles.suggestions,
    [styles.closed, results.length === 0]
  ])
  useImperativeHandle(forwardedRef, () => ulRef.current as HTMLUListElement)

  useNav(ulRef, inputRef)

  return (
    <ul className={classNames} ref={ulRef}>
      {results.map((country: Country, index: number) => (
        <Suggestion country={country} key={`${country.code}-${index}`} />
      ))}
    </ul>
  )
})
