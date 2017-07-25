import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
const pkg = require('./package.json')
const camelCase = require('lodash.camelcase')

const libraryName = 'sfdx-js'

export default {
  entry: `compiled/${libraryName}.js`,
  targets: [
	  { dest: pkg.main, moduleName: camelCase(libraryName), format: 'umd' },
	  { dest: pkg.module, format: 'es' }
  ],
  // To make "this is undefined" warning shut up.
  context: 'window',
  sourceMap: true,
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: ['process-promises', 'reflect-metadata"'],
  plugins: [
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps()
  ],
  globals: {'process-promises': 'process-promises'}
}
