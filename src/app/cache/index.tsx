'use client'
import { ReactNode, createContext, useState } from 'react'
import { CacheData, Country, Data } from './types'

export const cacheCtx = createContext<CacheData>({
  data: {},
  results: [],
  _: {},
})

export default function CacheProvider({ children }: {
  children: ReactNode
}) {
  const [country, setCountry] = useState<Country | undefined>(undefined)
  const [data, setData] = useState<Data>({})
  const [results, setResults] = useState<Country[]>([])

  return (
    <cacheCtx.Provider value={{
      country,
      data,
      results,
      _: {
        setCountry,
        setData,
        setResults,
      }
    }}>
      {children}
    </cacheCtx.Provider>
  )
}

export * from './hooks'
