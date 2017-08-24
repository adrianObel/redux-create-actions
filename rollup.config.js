import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'
import pkg from './package.json'

const minifyName = file => file.replace(/\.js/, '.min.js')
const plugins = minified => {
  const plugins = [
    babel()
  ]

  if (minified) {
    plugins.push(minify({ comments: false }))
  }

  return plugins
}

const umd = ({ minified } = {}) => ({
  entry: 'src/index.js',
  dest: minified ? minifyName(pkg.browser) : pkg.browser,
  format: 'umd',
  moduleName: 'ReduxCreateAction',
  plugins: plugins(minified)
})

const cjs = ({ minified } = {}) => ({
  entry: 'src/index.js',
  targets: [
    {
      dest: minified ? minifyName(pkg.main) : pkg.main,
      format: 'cjs'
    }, {
      dest: minified ? minifyName(pkg.module) : pkg.module,
      format: 'es'
    }
  ],
  plugins: plugins(minified)
})

export default [
  umd(),
  cjs(),
  umd({ minified: true }),
  cjs({ minified: true })
]
