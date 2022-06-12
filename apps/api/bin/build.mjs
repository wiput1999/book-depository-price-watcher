import { spawn } from 'child_process'
import { build } from 'esbuild'

let server
let isDev = process.argv[2] === 'dev'

const onRebuild = () => {
  if (isDev) {
    if (server) server.kill('SIGINT')
    server = spawn('node', ['dist/index.js'], { stdio: 'inherit' })
  }
}

build({
  entryPoints: ['src/index.ts'],
  outdir: 'dist',
  platform: 'node',
  target: 'esnext',
  format: 'esm',
  outExtension: { '.js': '.mjs' },
  bundle: true,
  sourcemap: true,
  minify: true,
  logLevel: 'info',
  watch: isDev && { onRebuild },
  banner: {
    js: [
      `import { createRequire as topLevelCreateRequire } from 'module'`,
      `const require = topLevelCreateRequire(import.meta.url)`,
    ].join('\n'),
  },
  external: ['db'],
}).finally(onRebuild)
