import {
  ChangeEvent,
  RefObject,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useApi, useSearch } from '.'
import { appCtx } from '@/app/data'

export const useInput = () => {
  const [value, setValue] = useState<string>('')
  const [inputRef, setInputRef]
    = useState<RefObject<HTMLInputElement>>()
  const [suggestionsRef, setSuggestionsRef]
    = useState<RefObject<HTMLUListElement>>()
  const { country, results } = useContext(appCtx)
  const { filter } = useSearch()
  const { submit } = useApi()
  
  useEffect(() => {
    let current = inputRef?.current || null

    if (current && country) {
      current.value = `(${country.code}) ${country.name}`
    }

    return () => {
      current = null
    }
  }, [country, inputRef])

  useEffect(() => {
    let current = inputRef?.current || null
    let suggestions = suggestionsRef?.current || null

    const keydown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        submit(value)
      } else if (e.key === 'ArrowDown' && results.length && suggestions) {
        (suggestions.firstChild as HTMLElement)?.focus()
      }
    }

    if (current && suggestions) {
      current.addEventListener('keydown', keydown)
    }

    return () => {
      if (current && suggestions) {
        current.removeEventListener('keydown', keydown)
      }
      current = null
      suggestions = null
    }
  }, [inputRef, results, suggestionsRef, submit])

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.toUpperCase())
    filter(e.target.value)
  }

  const registerRefs = (
    inputRef: RefObject<HTMLInputElement>,
    suggestionsRef: RefObject<HTMLUListElement>,
  ) => {
    setInputRef(inputRef)
    setSuggestionsRef(suggestionsRef)
  }

  const updateValue = (value: string) => setValue(value)

  return {
    changeInput,
    registerRefs,
    updateValue,
    value,
  }
}
