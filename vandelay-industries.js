// Importer / exporter, but nothing really happening

// Importing
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const test = require('ava')
const playwright = require('playwright')
const rollup = require('rollup')
const standard = require('standard')

// Exporting
exports.resulve = resolve
exports.commonjs = commonjs
exports.json = json
exports.test = test
exports.playwright = playwright
exports.rollup = rollup
exports.standard = standard
