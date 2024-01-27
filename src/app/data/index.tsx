'use client'
import { ReactNode, createContext, useState } from 'react'
import { AppData, Country, Data } from './types'

export const appCtx = createContext<AppData>({
  data: {},
  isEmpty: true,
  loading: false,
  message: null,
  results: [],
  _: {},
})

export default function AppProvider({ children }: {
  children: ReactNode
}) {
  const [country, setCountry]
    = useState<Country | undefined>(undefined)
  const [data, setData] = useState<Data>({})
  const [isEmpty, setIsEmpty] = useState<boolean>(true)
  const [results, setResults] = useState<Country[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <appCtx.Provider value={{
      country,
      data,
      isEmpty,
      loading,
      message,
      results,
      _: {
        setCountry,
        setData,
        setIsEmpty,
        setLoading,
        setMessage,
        setResults,
      }
    }}>
      {children}
    </appCtx.Provider>
  )
}

export * from './hooks'
