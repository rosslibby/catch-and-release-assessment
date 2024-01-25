'use client'
import { ReactNode, createContext, useState } from 'react'
import { CacheData, Country, Data } from './types'

export const cacheCtx = createContext<CacheData>({
  data: {},
  _: {},
})

export default function CacheProvider({ children }: {
  children: ReactNode
}) {
  const [country, setCountry] = useState<Country | undefined>(undefined)
  const [data, setData] = useState<Data>({})

  return (
    <cacheCtx.Provider value={{
      country,
      data,
      _: {
        setCountry,
        setData,
      }
    }}>
      {children}
    </cacheCtx.Provider>
  )
}

export * from './hooks'
