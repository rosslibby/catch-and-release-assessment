import { appCtx, useCache } from '@/app/data'
import { useCallback, useContext } from 'react'

export const useApi = () => {
  const { addCountry, hasCountry } = useCache()
  const { _: {
    setCountry,
    setLoading,
    setMessage,
    setResults,
  } } = useContext(appCtx)

  const submit = useCallback(async (value: string) => {
    if (!value.trim().match(/^[a-zA-Z]+$/g)) {
      setMessage('Please enter a valid country code')

      return
    }

    setMessage(null)
    setResults([])
    setCountry()
    setLoading(true)

    const cached = await hasCountry(value)

    if (!cached && value.trim()) {
      const result = await fetch(`/api/country/${value.toUpperCase()}`)
      if (result.status === 200) {
        const { data } = await result.json()
        addCountry(data)
        setCountry(data)
      } else {
        const { message } = await result.json()
        setMessage(message)
      }
    } else {
      setCountry(cached)
    }

    setLoading(false)
  }, [
    setCountry,
    setLoading,
    setMessage,
    setResults,
  ])

  return { submit }
}
