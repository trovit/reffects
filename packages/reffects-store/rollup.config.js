import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

export default [
  // CommonJS
  {
    input: 'src/index.js',
    output: { file: 'dist/reffects-store.js', format: 'cjs', indent: false },
    external: Object.keys(pkg.peerDependencies),
    plugins: [
      resolve({
        extensions: ['.js'],
      }),
    ],
  },

  // ES
  {
    input: 'src/index.js',
    output: { file: 'dist/reffects-store.es.js', format: 'es', indent: false },
    external: Object.keys(pkg.peerDependencies),
    plugins: [
      resolve({
        extensions: ['.js'],
      }),
    ],
  },

  // ES for Browsers (mjs)
  {
    input: 'src/index.js',
    output: {
      file: 'dist/reffects-store.mjs',
      format: 'es',
      indent: false,
      globals: {
        react: 'React',
      },
    },
    external: Object.keys(pkg.peerDependencies),
    plugins: [
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
      resolve({
        extensions: ['.js'],
      }),
    ],
  },

  // UMD Development
  {
    input: 'src/index.js',
    external: Object.keys(pkg.peerDependencies),
    output: {
      file: 'dist/reffects-store.umd.js',
      format: 'umd',
      name: 'reffects-store',
      indent: false,
      globals: {
        react: 'React',
      },
    },
    plugins: [
      resolve({
        extensions: ['.js'],
      }),
    ],
  },

  // UMD Production
  {
    input: 'src/index.js',
    external: Object.keys(pkg.peerDependencies),
    output: {
      file: 'dist/reffects-store.umd.min.js',
      format: 'umd',
      name: 'reffects-store',
      indent: false,
      globals: {
        react: 'React',
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
      resolve({
        extensions: ['.js'],
      }),
    ],
  },
];
