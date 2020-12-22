import ts from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'

const commonConf = {
  input: './src/index.ts',
  plugins:[
    ts({
      extensions: ['.ts'],
      tsconfig: './tsconfig.json',
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    }),
  ]
}

const list = [
  {
    file: 'lib/index.esm.js',
    format: 'es',
    exports: 'named',
  },
  {
    file: 'lib/index.js',
    format: 'umd',
    exports: 'named',
    name: 'VueLazyLoading',
    compact: true,
  },
]

const buildConf = options => Object.assign({}, commonConf, options)

export default list.map(output => buildConf({ output }))
