// Something like this:

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import pkg from './package.json'

export default [
  // browser-friendly UMD build
  // *** This needs to be stopword.js and not vandelay-industries.js ***
  {
    input: './vandelay-industries.js',
    output: {
      name: 'batrA',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      json()
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)

  // *** This needs to be stopword.js and not vandelay-industries.js ***
  {
    input: './vandelay-industries.js',
    output: [
      { name: 'batrB', file: pkg.main, format: 'cjs' },
      { name: 'batrC', file: pkg.module, format: 'es' }
    ]
  }
]
