'use client'
import { useContext } from 'react'
import { cacheCtx } from '.'
import { Countries, Country } from './types'

export const useCache = () => {
  const {
    countries,
    _: {
      setCountries,
    }
  } = useContext(cacheCtx)

  const addCountry = (country: Country) => {
    caches.open('countries')
      .then((cache: Cache) => {
        console.log('Adding country to cache:', country.code)
        cache.add(`/api/country/${country.code}`)
          .then(() => {
            setCountries((prevState: Countries) => ({
              ...prevState,
              [country.code]: country,
            }))
          })
          .catch((err: Error) => {
            console.error(`There was an error caching /api/country/${country.code}:`, err)
          })
      })
      .catch((err: Error) => {
        console.error('Error reading "countries" cache:', err)
      })
  }

  const hasCountry = (countryCode: string): Promise<Country | undefined> => new Promise(
    (resolve, reject) => {
      caches.open('countries')
        .then((cache: Cache) => {
          cache.match(`/api/country/${countryCode}`)
            .then(async (res: Response | undefined) => {
              if (!res) {
                resolve(undefined)
              } else {
                const { data } = await res?.json()

                resolve(data)
              }
            })
            .catch((err: Error) => {
              console.error(`Error reading cache for /api/country/${countryCode}:`, err)
              reject(undefined)
            })
        })
        .catch((err: Error) => {
          console.error('Error reading "countries" cache:', err)
          reject(undefined)
        })
    }
  )

  const removeItem = (key: Request, cache: Cache): Promise<boolean> => new Promise(
    (resolve, reject) => {
      cache.delete(key)
        .then((deleted: boolean) => {
          resolve(deleted)
        })
        .catch((err: Error) => {
          console.error(`There was a problem deleting ${key}:`, err)
        })
  })

  const clear = () => {
    caches.open('countries')
      .then((cache: Cache) => {
        cache.keys().then((keys) => {
          keys.forEach((key) => {
            removeItem(key, cache)
          })
        })
      })
  }

  return {
    addCountry,
    clear,
    hasCountry,
  }
}
