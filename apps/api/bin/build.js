/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

let server
let isDev = process.argv[2] === 'dev'
const { spawn } = require('child_process')
const onRebuild = () => {
  if (isDev) {
    if (server) server.kill('SIGINT')
    server = spawn('node', ['dist/index.js'], { stdio: 'inherit' })
  }
}

require('esbuild')
  .build({
    entryPoints: ['src/index.ts'],
    outdir: 'dist',
    bundle: true,
    sourcemap: true,
    minify: true,
    logLevel: 'info',
    watch: isDev && { onRebuild },
    external: ['db', 'fsevents'],
  })
  .finally(onRebuild)
