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
  input: 'src/index.js',
  output: {
    name: 'ReduxCreateActions',
    file: minified ? minifyName(pkg.browser) : pkg.browser,
    format: 'umd'
  },
  plugins: plugins(minified)
})

const cjs = ({ minified } = {}) => ({
  input: 'src/index.js',
  output: [
    {
      file: minified ? minifyName(pkg.main) : pkg.main,
      format: 'cjs'
    }, {
      file: minified ? minifyName(pkg.module) : pkg.module,
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
