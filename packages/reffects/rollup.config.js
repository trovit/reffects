import { terser } from 'rollup-plugin-terser'
import pkg from './package.json';

const external = Object.keys(pkg.dependencies);

export default [
  // CommonJS
  {
    input: 'src/index.js',
    output: { file: 'dist/reffects.js', format: 'cjs', indent: false },
    external,
  },

  // ES
  {
    input: 'src/index.js',
    output: { file: 'dist/reffects.es.js', format: 'es', indent: false },
    external,
  },

  // ES for Browsers
  {
    input: 'src/index.js',
    output: { file: 'dist/reffects.mjs', format: 'es', indent: false },
    external, 
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
      indent: false,
      globals: {
        speco: 'speco',
      },
    },
    external, 
  },

  // UMD Production
  {
    input: 'src/index.js',
    output: {
      file: 'dist/reffects.umd.min.js',
      format: 'umd',
      name: 'reffects',
      indent: false,
      globals: {
        speco: 'speco',
      },
    },
    external, 
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
