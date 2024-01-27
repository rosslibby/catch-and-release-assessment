import { describe, test, expect } from 'vitest'
import { GET } from './route'
import { NextRequest } from 'next/server'

describe('/api/country/US', () => {
  test(
    'returns country data pertaining to the United States',
    async () => {
      const req = new NextRequest(
        new Request('http://localhost:3000/api/country')
      )

      const response = await GET(req, { params: { code: 'US' }})

      expect(response.status).toBe(200)
      expect(await response.json()).toEqual({
        data: {
          code: 'US',
          capital: 'Washington D.C.',
          currency: 'USD,USN,USS',
          emoji: '🇺🇸',
          name: 'United States',
          native: 'United States',
        },
      })
    },
  )
})

describe('/api/country/ZT', () => {
  test(
    'returns message that no data can be found for nonexistent country code',
    async () => {
      const req = new NextRequest(
        new Request('http://localhost:3000/api/country')
      )

      const response = await GET(req, { params: { code: 'ZT' }})

      expect(response.status).toBe(404)
      expect(await response.json()).toEqual({
        message: 'No data found for country code ZT',
      })
    },
  )
})

describe('/api/country', () => {
  test(
    'returns message that no country code was provided',
    async () => {
      const req = new NextRequest(
        new Request('http://localhost:3000/api/country')
      )

      const response = await GET(req, { params: { code: '' }})

      expect(response.status).toBe(422)
      expect(await response.json()).toEqual({
        message: 'No country code was provided',
      })
    },
  )
})

describe('/api/country/4A', () => {
  test(
    'returns message indicating invalid country code',
    async () => {
      const req = new NextRequest(
        new Request('http://localhost:3000/api/country')
      )

      const response = await GET(req, { params: { code: '4A' }})

      expect(response.status).toBe(400)
      expect(await response.json()).toEqual({
        message: 'The country code you submitted was invalid',
      })
    },
  )
})
