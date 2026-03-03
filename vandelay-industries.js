// Importer / exporter, but nothing really happening
import { resolve } from '@rollup/plugin-node-resolve'
import { commonjs } from '@rollup/plugin-commonjs'
import { json } from '@rollup/plugin-json'
import { terser } from '@rollup/plugin-terser'
import { license } from 'rollup-plugin-license'
import { playwright } from 'playwright'
import { rollup } from 'rollup'
import { standard } from 'standard'

export { resolve, commonjs, json, terser, license, playwright, rollup, standard }
