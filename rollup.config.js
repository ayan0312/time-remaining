import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

const plugins = [
    typescript({
        tsconfig: 'tsconfig.json',
        removeComments: true,
        useTsconfigDeclarationDir: true,
    })
]

export default {
    input: 'index.ts',
    output: [
        { file: 'dist/time-remaining.js', format: 'umd', name: 'time-remaining', plugins: [terser()], sourcemap: true },
        { file: 'dist/time-remaining.esm.js', format: 'esm', sourcemap: true }
    ],
    plugins,
}