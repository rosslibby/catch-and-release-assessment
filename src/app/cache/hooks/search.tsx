'use client'
import { useContext } from 'react'
import { cacheCtx } from '..'
import { Country } from '../types'

declare global {
  interface String {
    lcStartsWith(searchString: string, position?: number | undefined): boolean
  }
}

String.prototype.lcStartsWith = function (searchString: string, position?: number | undefined): boolean {
  return this.toLowerCase().indexOf(searchString) === 0
}

export const useSearch = () => {
  const { data } = useContext(cacheCtx)

  const filter = (query: string): Country[] => {
    const lcQuery = query.toLowerCase()
    const specificCountry: [string, Country] | undefined
      = Object.entries(data).find(
        ([countryCode, details]: [string, Country]) => {
          return query.toUpperCase() === countryCode
            || query.toLowerCase() === details.name.toLowerCase()
        }
      )

    if (specificCountry) {
      return [data[specificCountry[0]]]
    }

    const options: Country[] = Object.entries(data).filter(
      ([_, details]: [string, Country]) => {
        const { name, code } = details
        console.log(`Comparing ${name} and ${code} to ${query}`)
        console.log(`${code} vs. ${query}:`, code.lcStartsWith(query.toLowerCase()))
        console.log(`${name} vs. ${query}:`, name.lcStartsWith(query.toLowerCase()))

        return name.lcStartsWith(lcQuery) || code.lcStartsWith(lcQuery)
      }
    ).map(([_, details]: [string, Country]) => {
      console.log('Deeets', details)
      return details
    })
    console.log('Final word:', options)

    return options
  }

  return {
    filter,
  }
}
