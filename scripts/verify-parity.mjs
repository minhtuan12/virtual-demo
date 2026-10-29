import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const original = readFileSync(resolve(root, 'Panorama 360° · Hướng dẫn viên AI.html'), 'utf8')
const manifest = JSON.parse(readFileSync(resolve(root, 'src/assets/manifest.json'), 'utf8'))

function literalArray(name) {
  const pattern = name === 'IMG' ? /const IMG=\[(.*?)\],TH=\[/s : /,TH=\[(.*?)\];/s
  const match = original.match(pattern)
  if (!match) throw new Error(`${name} array is missing from the baseline HTML`)
  return JSON.parse(`[${match[1]}]`)
}

function verify(kind, expectedDataUrls) {
  const entries = manifest[kind]
  if (entries.length !== expectedDataUrls.length) throw new Error(`${kind}: expected ${expectedDataUrls.length}, received ${entries.length}`)
  expectedDataUrls.forEach((dataUrl, index) => {
    const expected = Buffer.from(dataUrl.slice(dataUrl.indexOf(',') + 1), 'base64')
    const entry = entries[index]
    const actual = readFileSync(resolve(root, 'src/assets', entry.file))
    const hash = createHash('sha256').update(expected).digest('hex')
    if (!actual.equals(expected) || entry.bytes !== expected.length || entry.sha256 !== hash) {
      throw new Error(`${kind}[${index}] differs from the baseline HTML`)
    }
  })
}

verify('panoramas', literalArray('IMG'))
verify('thumbnails', literalArray('TH'))
console.log(`Asset parity verified: ${manifest.panoramas.length} panoramas, ${manifest.thumbnails.length} thumbnails.`)
