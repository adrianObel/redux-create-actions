import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default[
  {
    entry: 'src/index.js',
    dest: pkg.browser,
    format: 'umd',
    moduleName: 'ReduxCreateAction',
    plugins: [
      babel()
    ]
  },

  {
    entry: 'src/index.js',
    targets: [
      {
        dest: pkg.main,
        format: 'cjs'
      }, {
        dest: pkg.module,
        format: 'es'
      }
    ],
    plugins: [
      babel()
    ]
  }
]
