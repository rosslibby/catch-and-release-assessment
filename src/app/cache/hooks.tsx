'use client'
import { useContext } from 'react'
import { cacheCtx } from '.'

export const useCache = () => {
  const {
    countries,
    _: {
      setCountries,
    }
  } = useContext(cacheCtx)

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
    clear,
  }
}
