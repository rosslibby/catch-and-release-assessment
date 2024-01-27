import { Country } from '@/app/cache/types'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } },
) {
  const { code } = params

  if (!code || code.match(/[^a-zA-Z .]/g)?.length || code.length > 2) {
    return NextResponse.json({
      data: {
        message: code ? 'The country code you submitted was invalid' : 'No country code was provided',
      },
    }, { status: code ? 400 : 422 })
  }

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
    {
      data: data || {
        message: `No data found for country code ${code}`,
      },
    },
    { status: data ? 200 : 404 },
  )
}
