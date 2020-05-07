import { terser } from 'rollup-plugin-terser'

export default [
  // CommonJS
  {
    input: 'src/index.js',
    output: { file: 'dist/reffects.js', format: 'cjs', indent: false },
  },

  // ES
  {
    input: 'src/index.js',
    output: { file: 'dist/reffects.es.js', format: 'es', indent: false },
  },

  // ES for Browsers
  {
    input: 'src/index.js',
    output: { file: 'dist/reffects.mjs', format: 'es', indent: false },
    plugins: [
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ]
  },

  // UMD Development
  {
    input: 'src/index.js',
    output: {
      file: 'dist/reffects.umd.js',
      format: 'umd',
      name: 'reffects',
      indent: false
    },
  },

  // UMD Production
  {
    input: 'src/index.js',
    output: {
      file: 'dist/reffects.umd.min.js',
      format: 'umd',
      name: 'reffects',
      indent: false
    },
    plugins: [
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ]
  }
]
