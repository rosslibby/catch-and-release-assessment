'use client'
import { useContext } from 'react'
import { cacheCtx } from '../cache'
import { Country } from '../cache/types'

declare global {
  interface String {
    lcStartsWith(
      searchString: string,
      position?: number | undefined,
    ): boolean
  }
}

String.prototype.lcStartsWith = function (
  searchString: string,
  position?: number | undefined,
): boolean {
  return this.toLowerCase().indexOf(searchString) === 0
}

export const useSearch = () => {
  const { data, _: { setResults } } = useContext(cacheCtx)

  const filter = (query: string): void => {
    if (!query.length || query.match(/[^a-zA-Z ]/g)?.length) {
      setResults([])
      return
    }

    const lcQuery = query.toLowerCase()
    const specificCountry: [string, Country] | undefined
      = Object.entries(data).find(
        ([countryCode, details]: [string, Country]) => {
          return query.toUpperCase() === countryCode
            || query.toLowerCase() === details.name.toLowerCase()
        }
      )

    if (specificCountry) {
      const [_, country] = specificCountry
      setResults([country])
      return
    }

    const options: Country[] = Object.entries(data).filter(
      ([_, details]: [string, Country]) => {
        const { name, code } = details

        return name.lcStartsWith(lcQuery) || code.lcStartsWith(lcQuery)
      }
    ).map(([_, details]: [string, Country]) => details)

    setResults(options)
    return
  }

  return {
    filter,
  }
}
