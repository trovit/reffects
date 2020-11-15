import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import pkg from './package.json';

const external = Object.keys(pkg.peerDependencies);

export default [ 
  // CommonJS
  {
    input: 'src/index.js',
    output: { file: 'dist/reffects-batteries.js', format: 'cjs', indent: false },
    external,
    plugins: [
      nodeResolve({
        extensions: ['.js'],
      }),
    ],
  },

  // ES
  {
    input: 'src/index.js',
    output: { file: 'dist/reffects-batteries.es.js', format: 'es', indent: false },
    external, 
    plugins: [
      nodeResolve({
        extensions: ['.js'],
      }),
    ],
  },

  // ES for Browsers (mjs)
  {
    input: 'src/index.js',
    output: {
      file: 'dist/reffects-batteries.mjs',
      format: 'es',
      indent: false,
      globals: {
        react: 'React',
      },
    },
    external,
    plugins: [
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
      nodeResolve({
        extensions: ['.js'],
      }),
    ],
  },

  // UMD Development
  {
    input: 'src/index.js',
    external,
    output: {
      file: 'dist/reffects-batteries.umd.js',
      format: 'umd',
      name: 'reffects-batteries',
      indent: false,
      globals: {
        react: 'React',
        reffects: 'reffects',
      },
    },
    plugins: [
      nodeResolve({
        extensions: ['.js'],
      }),
    ],
  },

  // UMD Production
  {
    input: 'src/index.js',
    external,
    output: {
      file: 'dist/reffects-batteries.umd.min.js',
      format: 'umd',
      name: 'reffects-batteries',
      indent: false,
      globals: {
        react: 'React',
        reffects: 'reffects',
      },
    },
    plugins: [
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
      nodeResolve({
        extensions: ['.js'],
      }),
    ],
  },
];
