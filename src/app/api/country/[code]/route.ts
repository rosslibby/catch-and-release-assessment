import { Country } from '@/app/cache/types'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } },
) {
  const { code } = params
  const query = `query GetCountryById($code: ID!) {
    country(code: $code) {
      code
      capital
      currency
      emoji
      name
      native
    }
  }`

  const data: Country | undefined | Error = await new Promise((resolve, reject) => fetch('https://countries.trevorblades.com/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { code },
      })
    }).then(async (res: Response) => {
      const { data } = await res.json()
      if (data) {
        const { country } = data

        if (country) {
          resolve(country)
        } else {
          resolve(undefined)
        }
      }
    }).catch((err: Error) => {
      console.error('There was an error reaching the API:', err)
      reject(err)
    })
  )

  return NextResponse.json(
    { data },
    { status: 200 },
  )
}
