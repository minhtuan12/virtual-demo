import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('Vercel SPA routing', () => {
  it('rewrites direct React Router requests to index.html', () => {
    const config = JSON.parse(readFileSync('vercel.json', 'utf8'))
    expect(config.rewrites).toContainEqual({ source: '/(.*)', destination: '/index.html' })
  })
})
