interface State {
  country: Country
  name: string
}

interface Language {
  name: string
  native: string
}

export interface Country {
  code: string
  capital: string
  currency: string
  emoji: string
  languages: Language[]
  name: string
  native: string
  phones: string[]
  states?: State
}

export interface Countries {
  [key: string]: Country
}

export interface CacheData {
  countries: Countries
  country?: Country | undefined
  _: {
    [key: string]: Function
  }
}
