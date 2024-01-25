'use client'
import { ReactNode, createContext, useState } from 'react'
import { CacheData, Countries, Country } from './types'

export const cacheCtx = createContext<CacheData>({
  countries: {},
  _: {},
})

export default function CacheProvider({ children }: {
  children: ReactNode
}) {
  const [countries, setCountries] = useState<Countries>({})
  const [country, setCountry] = useState<Country | undefined>(undefined)

  return (
    <cacheCtx.Provider value={{
      countries,
      country,
      _: {
        setCountries,
        setCountry,
      }
    }}>
      {children}
    </cacheCtx.Provider>
  )
}

export * from './hooks'
