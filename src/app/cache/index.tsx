'use client'
import { ReactNode, createContext, useState } from 'react'
import { CacheData, Country } from './types'

export const cacheCtx = createContext<CacheData>({
  _: {},
})

export default function CacheProvider({ children }: {
  children: ReactNode
}) {
  const [country, setCountry] = useState<Country | undefined>(undefined)

  return (
    <cacheCtx.Provider value={{
      country,
      _: {
        setCountry,
      }
    }}>
      {children}
    </cacheCtx.Provider>
  )
}

export * from './hooks'
