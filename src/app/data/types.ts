export interface Country {
  code: string
  capital: string
  currency: string
  emoji: string
  name: string
  native: string
}

export interface Data {
  [key: string]: Country
}

export interface AppData {
  country?: Country | undefined
  data: Data
  loading: boolean
  message: string | null
  results: Country[]
  _: {
    [key: string]: Function
  }
}
