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

export interface Data {
  [key: string]: Country
}

export interface CacheData {
  country?: Country | undefined
  data: Data
  _: {
    [key: string]: Function
  }
}
