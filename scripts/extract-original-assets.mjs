import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, extname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sourcePath = resolve(root, 'Panorama 360° · Hướng dẫn viên AI.html')
const source = readFileSync(sourcePath, 'utf8')

function literalArray(name) {
  const pattern = name === 'IMG' ? /const IMG=\[(.*?)\],TH=\[/s : /,TH=\[(.*?)\];/s
  const match = source.match(pattern)
  if (!match) throw new Error(`${name} array not found in ${sourcePath}`)
  return JSON.parse(`[${match[1]}]`)
}

function extension(mime) {
  const known = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
  }
  const value = known[mime]
  if (!value) throw new Error(`Unsupported image MIME type: ${mime}`)
  return value
}

function extract(kind, prefix, values) {
  const outputDirectory = resolve(root, 'src/assets', kind)
  mkdirSync(outputDirectory, { recursive: true })

  return values.map((dataUrl, index) => {
    const match = dataUrl.match(/^data:([^;,]+);base64,(.+)$/s)
    if (!match) throw new Error(`Invalid data URL at ${kind}[${index}]`)
    const bytes = Buffer.from(match[2], 'base64')
    const fileName = `${prefix}-${String(index + 1).padStart(2, '0')}${extension(match[1])}`
    const outputPath = resolve(outputDirectory, fileName)
    writeFileSync(outputPath, bytes)
    return {
      file: `${kind}/${fileName}`,
      sha256: createHash('sha256').update(bytes).digest('hex'),
      bytes: bytes.byteLength,
    }
  })
}

const manifest = {
  panoramas: extract('panoramas', 'panorama', literalArray('IMG')),
  thumbnails: extract('thumbnails', 'thumbnail', literalArray('TH')),
}

for (const entries of Object.values(manifest)) {
  for (const entry of entries) {
    if (!extname(entry.file)) throw new Error(`Missing file extension: ${entry.file}`)
  }
}

writeFileSync(resolve(root, 'src/assets/manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`Extracted ${manifest.panoramas.length} panoramas and ${manifest.thumbnails.length} thumbnails.`)
