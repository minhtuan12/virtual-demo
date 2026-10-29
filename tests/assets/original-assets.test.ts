import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import manifest from '../../src/assets/manifest.json'

const root = resolve(import.meta.dirname, '../..')
const original = readFileSync(resolve(root, 'Panorama 360° · Hướng dẫn viên AI.html'), 'utf8')

function literalArray(name: 'IMG' | 'TH'): string[] {
  const pattern = name === 'IMG' ? /const IMG=\[(.*?)\],TH=\[/s : /,TH=\[(.*?)\];/s
  const match = original.match(pattern)
  if (!match) throw new Error(`${name} array not found`)
  return JSON.parse(`[${match[1]}]`) as string[]
}

function decoded(dataUrl: string): Buffer {
  const comma = dataUrl.indexOf(',')
  return Buffer.from(dataUrl.slice(comma + 1), 'base64')
}

describe('extracted original assets', () => {
  it.each([
    ['panoramas', literalArray('IMG')],
    ['thumbnails', literalArray('TH')],
  ] as const)('preserves every %s byte-for-byte', (kind, originals) => {
    expect(manifest[kind]).toHaveLength(originals.length)
    originals.forEach((source, index) => {
      const expected = decoded(source)
      const entry = manifest[kind][index]
      const actual = readFileSync(resolve(root, 'src/assets', entry.file))
      expect(entry.bytes).toBe(expected.byteLength)
      expect(entry.sha256).toBe(createHash('sha256').update(expected).digest('hex'))
      expect(actual.equals(expected)).toBe(true)
    })
  })
})
