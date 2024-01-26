export interface Country {
  code: string
  capital: string
  currency: string
  emoji: string
  name: string
  native: string
  phones: string[]
}

export interface Data {
  [key: string]: Country
}

export interface CacheData {
  country?: Country | undefined
  data: Data
  results: Country[]
  _: {
    [key: string]: Function
  }
}
