import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';

export default [
  {
    input: {
      main: 'src/blockcerts-verifier/index.ts'
    },
    output: [
      {
        dir: 'dist',
        format: 'esm',
        name: 'BlockcertsVerifier',
        inlineDynamicImports: false
      }
    ],
    plugins: [
      commonjs(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      typescript(),
      resolve({
        browser: true,
        preferBuiltins: true
      }),
      terser(),
      visualizer({
        filename: 'bundle-stats.html',
        title: 'Blockcerts-Verifier bundle stats',
        template: 'sunburst',
        open: true,
        gzipSize: true
      })
    ]
  }
];
