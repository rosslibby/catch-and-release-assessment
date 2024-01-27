import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import styles from './search.module.css'
import Suggestions from './suggestions'
import Loading from './loading'
import { appCtx, useCache } from '@/app/data'
import SubmitButton from './submit'
import { useInput } from './hooks/input'
import { classnames } from '@/utils'

export default function Search() {
  const searchRef = useRef<HTMLDivElement>(null)
  const suggestionsRef = useRef<HTMLUListElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { message } = useContext(appCtx)
  const { changeInput, registerRefs, value } = useInput()
  const { clear, isEmpty } = useCache()
  const [focused, setFocused] = useState<boolean>(false)
  const searchClassnames = classnames([styles.search, [styles.searchFocus, focused]])

  useEffect(() => {
    registerRefs(inputRef, suggestionsRef)
  }, [inputRef, suggestionsRef])

  return (
    <div className={styles.wrapper}>
      <div className={searchClassnames} ref={searchRef}>
        <div className={styles.inputWrapper}>
          <input
            autoComplete="hellno"
            className={styles.input}
            data-testid="input"
            onChange={changeInput}
            placeholder="Enter a country code (e.g. US)"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            ref={inputRef}
            type="text"
          />

          <Loading />

          <SubmitButton value={value} />

        </div>
        <Suggestions ref={suggestionsRef} inputRef={inputRef} />
      </div>

      {message && (
        <p>{message}</p>
      )}

      <div className="buttons">
        <button
          className={styles.button}
          disabled={isEmpty}
          role="refetch"
          onClick={clear}
        >Refetch</button>
      </div>
    </div>
  )
}
