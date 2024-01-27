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
    setMessage(null)
    setResults([])
    setCountry()
    setLoading(true)

    const cached = await hasCountry(value)

    if (!cached) {
      const result = await fetch(`/api/country/${value.toUpperCase()}`)
      console.log(result)
      if (result.status === 200) {
        const { data } = await result.json()
        console.log(data)
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
