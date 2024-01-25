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
      languages {
        name
        native
      }
      name
      native
      phones
      states {
        country {
          name
        }
        name
      }
    }
  }`

  const { data } = await (await fetch(`https://countries.trevorblades.com/`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { code },
    })
  })).json()

  return NextResponse.json(
    {
      data,
    },
    { status: 200 },
  )
}
