import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'
import vue from 'rollup-plugin-vue'

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      name: 'webcg-devtools',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      resolve({
        browser: true,
        main: true
      }),
      commonjs(),
      json(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.VUE_ENV': JSON.stringify('browser')
      }),
      vue({ compileTemplate: true }),
      buble()
    ]
  }
]
