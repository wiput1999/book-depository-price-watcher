/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

require('esbuild').build({
  entryPoints: ['src/index.ts'],
  sourceRoot: 'src',
  bundle: true,
  minify: true,
  sourcemap: true,
  outdir: 'dist',
  platform: 'node',
  external: ['db'],
  watch: process.env.WATCH
    ? {
        onRebuild(error, result) {
          if (error) console.error('watch build failed:', error)
          else console.log('watch build succeeded:', result)
        },
      }
    : false,
})
