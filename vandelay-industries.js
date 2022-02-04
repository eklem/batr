// Importer / exporter, but nothing really happening
module.exports = {
  resolve: require('@rollup/plugin-node-resolve'),
  commonjs: require('@rollup/plugin-commonjs'),
  json: require('@rollup/plugin-json'),
  terser: require('rollup-plugin-terser'),
  license: require('rollup-plugin-license'),
  ava: require('ava').default,
  playwright: require('playwright'),
  rollup: require('rollup'),
  standard: require('standard')
}
