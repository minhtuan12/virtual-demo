import { spawn } from 'node:child_process'
import { resolve } from 'node:path'
import { preview } from 'vite'

const server = await preview({ preview: { host: '127.0.0.1', port: 4173, strictPort: true } })
const child = spawn(process.execPath, [resolve('node_modules/@playwright/test/cli.js'), 'test', ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: process.env,
})

const code = await new Promise((resolveExit, reject) => {
  child.once('error', reject)
  child.once('exit', (exitCode) => resolveExit(exitCode ?? 1))
})
await server.close()
process.exit(code)
